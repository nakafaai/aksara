import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, PlatformError } from "effect";
import {
  fingerprintSelectedDocument,
  verifySelectedDirectory,
  verifySelectedFingerprint,
} from "#cli/integrity";
import { selectPreviewDocument } from "#cli/repository";
import { makeRepositoryTracker, REPOSITORY_ROOT } from "#test/real";

const repositories = makeRepositoryTracker();
const QUESTION_PATH =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/question.en.mdx";

afterEach(() => {
  repositories.clear();
});

layer(NodeServices.layer)("preview source integrity", (it) => {
  it.effect(
    "rejects missing or changed files across one compilation closure",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const repository = repositories.create();
        const aksaraRoot = yield* fileSystem.realPath(repository.aksaraRoot);
        const documentPath = yield* fileSystem.realPath(
          repository.documentPath
        );
        const requested = path.relative(aksaraRoot, documentPath);
        const selected = yield* selectPreviewDocument(aksaraRoot, requested);
        const fingerprint = yield* fingerprintSelectedDocument(selected);
        yield* fileSystem.writeFileString(
          repository.documentPath,
          "changed during compilation"
        );
        const changed = yield* verifySelectedFingerprint(
          selected,
          fingerprint
        ).pipe(Effect.flip);
        yield* fileSystem.remove(repository.documentPath);
        const missing = yield* fingerprintSelectedDocument(selected).pipe(
          Effect.flip
        );

        expect(changed).toMatchObject({
          kind: "document",
          path: selected.document.sourcePath,
          reason: "changed",
        });
        expect(missing).toMatchObject({
          kind: "document",
          path: selected.document.sourcePath,
          reason: "missing",
        });
      })
  );

  it.effect(
    "rejects missing, replaced, and unreadable selected directories",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const selected = yield* selectPreviewDocument(
          yield* fileSystem.realPath(REPOSITORY_ROOT),
          QUESTION_PATH
        );
        const [directory] = selected.directories;
        expect(directory).toBeDefined();
        if (directory === undefined) {
          return;
        }
        const systemError = PlatformError.systemError({
          _tag: "NotFound",
          method: "realPath",
          module: "FileSystem",
          pathOrDescriptor: directory.absolutePath,
        });
        const failures = yield* Effect.all(
          [
            verifySelectedDirectory(directory).pipe(
              Effect.provide(
                FileSystem.layerNoop({
                  realPath: () => Effect.fail(systemError),
                })
              ),
              Effect.flip
            ),
            verifySelectedDirectory(directory).pipe(
              Effect.provide(
                FileSystem.layerNoop({
                  realPath: () =>
                    Effect.succeed(`${directory.absolutePath}-moved`),
                })
              ),
              Effect.flip
            ),
            verifySelectedDirectory(directory).pipe(
              Effect.provide(
                FileSystem.layerNoop({
                  readDirectory: () => Effect.fail(systemError),
                  realPath: () => Effect.succeed(directory.absolutePath),
                })
              ),
              Effect.flip
            ),
          ],
          { concurrency: "unbounded" }
        );

        expect(failures).toEqual([
          expect.objectContaining({
            _tag: "PreviewRestartError",
            sourcePath: directory.sourcePath,
          }),
          expect.objectContaining({
            _tag: "PreviewRestartError",
            sourcePath: directory.sourcePath,
          }),
          expect.objectContaining({
            _tag: "PreviewRestartError",
            sourcePath: directory.sourcePath,
          }),
        ]);
      })
  );
});
