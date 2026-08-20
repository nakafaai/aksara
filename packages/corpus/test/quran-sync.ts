import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { Effect, FileSystem, PlatformError } from "effect";
import { HttpClient, HttpClientResponse } from "effect/unstable/http";

import {
  GERMAN_QURAN_PUBLICATION_URL,
  GERMAN_QURAN_SOURCE_URL,
} from "#corpus/quran/source/policy";
import { syncGermanQuranSources } from "#corpus/quran/source/sync";

const sourceRoot = resolve(import.meta.dirname, "../quran/sources");

/** Exact checked-in artifacts used by source-sync behavior tests. */
export const officialQuranSyncSources = new Map([
  [
    GERMAN_QURAN_PUBLICATION_URL,
    new Uint8Array(
      readFileSync(resolve(sourceRoot, "german/publication.json"))
    ),
  ],
  [
    GERMAN_QURAN_SOURCE_URL,
    new Uint8Array(readFileSync(resolve(sourceRoot, "german/translation.xml"))),
  ],
]);

/** Creates one deterministic HTTP adapter for both official artifacts. */
function sourceClient(
  sources: ReadonlyMap<string, Uint8Array>,
  status = 200,
  stalledUrl?: string
) {
  return HttpClient.make((request) => {
    if (request.url === stalledUrl) {
      return Effect.never;
    }
    const bytes = sources.get(request.url);
    if (bytes === undefined) {
      return Effect.die(new Error(`Unexpected source request: ${request.url}`));
    }
    return Effect.succeed(
      HttpClientResponse.fromWeb(request, new Response(bytes, { status }))
    );
  });
}

/** Creates one platform filesystem failure for a selected write operation. */
export function quranSyncFileFailure(method: string) {
  return PlatformError.systemError({
    _tag: "PermissionDenied",
    method,
    module: "FileSystem",
  });
}

/** Replaces one exact response without mutating the shared fixture. */
export function replaceQuranSyncSource(url: string, bytes: Uint8Array) {
  return new Map([...officialQuranSyncSources, [url, bytes]]);
}

interface QuranSyncTestOptions {
  /** Overrides one filesystem operation for typed failure coverage. */
  readonly configureFileSystem?: (
    fileSystem: FileSystem.FileSystem
  ) => FileSystem.FileSystem;
  readonly prior?: {
    readonly publication: Uint8Array;
    readonly translation: Uint8Array;
  };
  readonly stalledUrl?: string;
  readonly status?: number;
}

/** Runs one source sync against isolated targets and injected boundaries. */
export function quranSyncTestProgram(
  sources: ReadonlyMap<string, Uint8Array> = officialQuranSyncSources,
  options: QuranSyncTestOptions = {}
) {
  return Effect.scoped(
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const repositoryRoot = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-quran-source-sync-",
      });
      const targets = {
        publication: resolve(
          repositoryRoot,
          "packages/corpus/quran/sources/german/publication.json"
        ),
        translation: resolve(
          repositoryRoot,
          "packages/corpus/quran/sources/german/translation.xml"
        ),
      };
      const backup = resolve(
        repositoryRoot,
        "packages/corpus/quran/sources/german-previous"
      );
      if (options.prior !== undefined) {
        yield* fileSystem.makeDirectory(resolve(targets.publication, ".."), {
          recursive: true,
        });
        yield* Effect.all([
          fileSystem.writeFile(targets.publication, options.prior.publication),
          fileSystem.writeFile(targets.translation, options.prior.translation),
        ]);
      }
      const configured =
        options.configureFileSystem?.(fileSystem) ?? fileSystem;
      const outcome = yield* syncGermanQuranSources(repositoryRoot).pipe(
        Effect.provideService(FileSystem.FileSystem, configured),
        Effect.provideService(
          HttpClient.HttpClient,
          sourceClient(sources, options.status, options.stalledUrl)
        ),
        Effect.result
      );
      const publicationInstalled = yield* fileSystem.exists(
        targets.publication
      );
      const translationInstalled = yield* fileSystem.exists(
        targets.translation
      );
      return {
        backupExists: yield* fileSystem.exists(backup),
        installed: publicationInstalled && translationInstalled,
        installedBytes:
          publicationInstalled && translationInstalled
            ? {
                publication: Uint8Array.from(
                  yield* fileSystem.readFile(targets.publication)
                ),
                translation: Uint8Array.from(
                  yield* fileSystem.readFile(targets.translation)
                ),
              }
            : undefined,
        outcome,
        targets,
      };
    })
  );
}

/** Runs one isolated source sync with live platform services. */
export function runQuranSyncTest(
  ...arguments_: Parameters<typeof quranSyncTestProgram>
) {
  return Effect.runPromise(
    quranSyncTestProgram(...arguments_).pipe(Effect.provide(NodeServices.layer))
  );
}
