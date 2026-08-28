import { NodeServices } from "@effect/platform-node";
import {
  Context,
  Deferred,
  Effect,
  FileSystem,
  Layer,
  Path,
  PlatformError,
} from "effect";
import { HttpClient, HttpClientResponse } from "effect/unstable/http";

import {
  GERMAN_QURAN_EDITION_URL,
  GERMAN_QURAN_PUBLICATION_URL,
  GERMAN_QURAN_SOURCE_URL,
  GERMAN_QURAN_TERMS_URL,
} from "#corpus/quran/source/policy";
import { syncGermanQuranSources } from "#corpus/quran/source/sync";

interface QuranSyncFixtureValue {
  readonly edition: Uint8Array;
  readonly publication: Uint8Array;
  readonly sources: ReadonlyMap<string, Uint8Array>;
  readonly terms: Uint8Array;
  readonly translation: Uint8Array;
}

/** Loads the exact checked-in artifacts through Effect platform services. */
const loadQuranSyncFixture = Effect.fn(
  "AksaraCorpus.test.loadQuranSyncFixture"
)(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourceRoot = path.resolve(import.meta.dirname, "../quran/sources");
  const [edition, publication, terms, translation] = yield* Effect.all(
    [
      fileSystem.readFile(path.join(sourceRoot, "german/edition.pdf")),
      fileSystem.readFile(path.join(sourceRoot, "german/publication.json")),
      fileSystem.readFile(path.join(sourceRoot, "german/faq.html")),
      fileSystem.readFile(path.join(sourceRoot, "german/translation.xml")),
    ],
    { concurrency: "unbounded" }
  );
  const fixture = {
    edition: Uint8Array.from(edition),
    publication: Uint8Array.from(publication),
    terms: Uint8Array.from(terms),
    translation: Uint8Array.from(translation),
  };

  return {
    ...fixture,
    sources: new Map([
      [GERMAN_QURAN_EDITION_URL, fixture.edition],
      [GERMAN_QURAN_PUBLICATION_URL, fixture.publication],
      [GERMAN_QURAN_TERMS_URL, fixture.terms],
      [GERMAN_QURAN_SOURCE_URL, fixture.translation],
    ]),
  } satisfies QuranSyncFixtureValue;
});

/** Provides authenticated Quran source bytes to Effect-native sync tests. */
export class QuranSyncFixture extends Context.Service<
  QuranSyncFixture,
  QuranSyncFixtureValue
>()("AksaraCorpus.test.QuranSyncFixture") {}

/** Shares one authenticated fixture load across the sync test suite. */
export const quranSyncFixtureLayer = Layer.effect(
  QuranSyncFixture,
  loadQuranSyncFixture()
).pipe(Layer.provideMerge(NodeServices.layer));

/** Creates the prior installed bundle used by restoration tests. */
export function makePriorQuranSyncSources() {
  return {
    edition: new TextEncoder().encode("prior edition"),
    publication: new TextEncoder().encode("prior publication"),
    terms: new TextEncoder().encode("prior terms"),
    translation: new TextEncoder().encode("prior translation"),
  };
}

/** Creates one deterministic HTTP adapter for every official artifact. */
function sourceClient(
  sources: ReadonlyMap<string, Uint8Array>,
  options: QuranSyncTestOptions
) {
  return HttpClient.make((request) => {
    if (request.url === options.stalledUrl) {
      if (options.stallStarted === undefined) {
        return Effect.never;
      }
      return Deferred.succeed(options.stallStarted, undefined).pipe(
        Effect.andThen(Effect.never)
      );
    }
    const bytes = sources.get(request.url);
    if (bytes === undefined) {
      return Effect.die(`Unexpected source request: ${request.url}`);
    }
    return Effect.succeed(
      HttpClientResponse.fromWeb(
        request,
        new Response(bytes, { status: options.status ?? 200 })
      )
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
export function replaceQuranSyncSource(
  sources: ReadonlyMap<string, Uint8Array>,
  url: string,
  bytes: Uint8Array
) {
  return new Map([...sources, [url, bytes]]);
}

interface QuranSyncTestOptions {
  /** Overrides one filesystem operation for typed failure coverage. */
  readonly configureFileSystem?: (
    fileSystem: FileSystem.FileSystem
  ) => FileSystem.FileSystem;
  readonly prior?: {
    readonly edition: Uint8Array;
    readonly publication: Uint8Array;
    readonly terms: Uint8Array;
    readonly translation: Uint8Array;
  };
  readonly stalledUrl?: string;
  /** Resolves when the intentionally stalled request reaches the HTTP seam. */
  readonly stallStarted?: Deferred.Deferred<void>;
  readonly status?: number;
}

/** Runs one source sync against isolated targets and injected boundaries. */
export const quranSyncTestProgram = Effect.fn("AksaraCorpus.test.quranSync")(
  function* (
    sources: ReadonlyMap<string, Uint8Array>,
    options: QuranSyncTestOptions = {}
  ) {
    return yield* Effect.scoped(
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const repositoryRoot = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-quran-source-sync-",
        });
        const targets = {
          edition: path.join(
            repositoryRoot,
            "packages/corpus/quran/sources/german/edition.pdf"
          ),
          publication: path.join(
            repositoryRoot,
            "packages/corpus/quran/sources/german/publication.json"
          ),
          terms: path.join(
            repositoryRoot,
            "packages/corpus/quran/sources/german/faq.html"
          ),
          translation: path.join(
            repositoryRoot,
            "packages/corpus/quran/sources/german/translation.xml"
          ),
        };
        const backup = path.join(
          repositoryRoot,
          "packages/corpus/quran/sources/german-previous"
        );
        if (options.prior !== undefined) {
          yield* fileSystem.makeDirectory(path.dirname(targets.publication), {
            recursive: true,
          });
          yield* Effect.all([
            fileSystem.writeFile(targets.edition, options.prior.edition),
            fileSystem.writeFile(
              targets.publication,
              options.prior.publication
            ),
            fileSystem.writeFile(targets.terms, options.prior.terms),
            fileSystem.writeFile(
              targets.translation,
              options.prior.translation
            ),
          ]);
        }
        const configured =
          options.configureFileSystem?.(fileSystem) ?? fileSystem;
        const outcome = yield* syncGermanQuranSources(repositoryRoot).pipe(
          Effect.provideService(FileSystem.FileSystem, configured),
          Effect.provideService(
            HttpClient.HttpClient,
            sourceClient(sources, options)
          ),
          Effect.result
        );
        const publicationInstalled = yield* fileSystem.exists(
          targets.publication
        );
        const editionInstalled = yield* fileSystem.exists(targets.edition);
        const translationInstalled = yield* fileSystem.exists(
          targets.translation
        );
        const termsInstalled = yield* fileSystem.exists(targets.terms);
        return {
          backupExists: yield* fileSystem.exists(backup),
          installed:
            editionInstalled &&
            publicationInstalled &&
            termsInstalled &&
            translationInstalled,
          installedBytes:
            editionInstalled &&
            publicationInstalled &&
            termsInstalled &&
            translationInstalled
              ? {
                  edition: Uint8Array.from(
                    yield* fileSystem.readFile(targets.edition)
                  ),
                  publication: Uint8Array.from(
                    yield* fileSystem.readFile(targets.publication)
                  ),
                  terms: Uint8Array.from(
                    yield* fileSystem.readFile(targets.terms)
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
);
