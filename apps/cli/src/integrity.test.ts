import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, FileSystem, Path, PlatformError } from "effect";
import {
  captureSelectedFiles,
  fingerprintSelectedDocument,
  verifySelectedDirectory,
  verifySelectedFingerprint,
} from "#cli/integrity";
import { selectPreviewDocument } from "#cli/repository";
import { FIXED_FILES, FIXED_SELECTION, readFixedText } from "#test/integrity";
import { makeRepositoryTracker, REPOSITORY_ROOT } from "#test/real";

const repositories = makeRepositoryTracker();
const QUESTION_PATH =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-2/question-1/question.id.mdx";

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

  // The live closure changes with authored imports, so this pin uses fixed files.
  // captureSelectedFiles hashes restart files with the readSelectedHash that
  // fingerprintSelectedDocument also uses.
  it.effect("pins the sha256 of each captured file's own exact text", () =>
    Effect.gen(function* () {
      const captured = yield* captureSelectedFiles(FIXED_FILES).pipe(
        Effect.provide(
          FileSystem.layerNoop({
            readFileString: readFixedText,
            realPath: (absolutePath) => Effect.succeed(absolutePath),
          })
        )
      );
      expect(captured).toEqual([
        {
          absolutePath: "/test/aksara/packages/corpus/test/document.mdx",
          baselineHash:
            "sha256:354a869c808ab6cafcdea17d13ee961920332a08cc03768db27d60a537d7d729",
          mode: "restart",
          sourcePath: "packages/corpus/test/document.mdx",
        },
        {
          absolutePath: "/test/aksara/packages/corpus/test/item.ts",
          baselineHash:
            "sha256:9431b58413a520603ed260e409dc02fcbb2650bd24ef5e04242dc11b2cb86217",
          mode: "restart",
          sourcePath: "packages/corpus/test/item.ts",
        },
        {
          absolutePath: "/test/aksara/packages/corpus/test/schema.ts",
          baselineHash:
            "sha256:c65fcf75e8a9072b576c0b1e393eac6b8e7c5122736f69b6a2917e617900e0be",
          mode: "restart",
          sourcePath: "packages/corpus/test/schema.ts",
        },
      ]);
    })
  );

  // The page closure is a fixed selection, so this pin never reads the live corpus.
  it.effect(
    "pins the sha256 of each file in a fixed page closure, in closure order",
    () =>
      Effect.gen(function* () {
        const fingerprint = yield* fingerprintSelectedDocument(
          FIXED_SELECTION
        ).pipe(
          Effect.provide(
            FileSystem.layerNoop({ readFileString: readFixedText })
          )
        );
        expect(fingerprint).toEqual({
          files: [
            {
              hash: "sha256:9aa963eadec358061160728e034361550182b1af500190d4ee112ba84dde57d5",
              sourcePath: "packages/corpus/pages/test-page/en.mdx",
            },
            {
              hash: "sha256:9431b58413a520603ed260e409dc02fcbb2650bd24ef5e04242dc11b2cb86217",
              sourcePath: "packages/corpus/test/item.ts",
            },
          ],
        });
      })
  );

  it.effect(
    "fingerprints each selected file in closure order with a distinct hash",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const selected = yield* selectPreviewDocument(
          yield* fileSystem.realPath(REPOSITORY_ROOT),
          QUESTION_PATH,
          AppLocaleSchema.make("en")
        );
        /** Gives every selected absolute path its own text so a swap changes its hash. */
        const textFor = (absolutePath: string) =>
          `Test source text for ${absolutePath}\n`;
        const fingerprint = yield* fingerprintSelectedDocument(selected).pipe(
          Effect.provide(
            FileSystem.layerNoop({
              readFileString: (absolutePath) =>
                Effect.succeed(textFor(absolutePath)),
            })
          )
        );
        expect(fingerprint.files.map(({ sourcePath }) => sourcePath)).toEqual(
          selected.files.map(({ sourcePath }) => sourcePath)
        );
        expect(new Set(fingerprint.files.map(({ hash }) => hash)).size).toBe(
          selected.files.length
        );
      })
  );

  it.effect(
    "accepts a directory listing in any order when its sorted names match",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const selected = yield* selectPreviewDocument(
          yield* fileSystem.realPath(REPOSITORY_ROOT),
          QUESTION_PATH,
          AppLocaleSchema.make("en")
        );
        const [directory] = selected.directories;
        expect(directory).toBeDefined();
        if (directory === undefined) {
          return;
        }
        const reversed = [...directory.files].reverse();
        yield* verifySelectedDirectory(directory).pipe(
          Effect.provide(
            FileSystem.layerNoop({
              readDirectory: () => Effect.succeed(reversed),
              realPath: () => Effect.succeed(directory.absolutePath),
            })
          )
        );
        const extra = yield* verifySelectedDirectory(directory).pipe(
          Effect.provide(
            FileSystem.layerNoop({
              readDirectory: () => Effect.succeed([...reversed, "extra.mdx"]),
              realPath: () => Effect.succeed(directory.absolutePath),
            })
          ),
          Effect.flip
        );
        expect(extra).toMatchObject({
          _tag: "PreviewRestartError",
          sourcePath: directory.sourcePath,
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
          QUESTION_PATH,
          AppLocaleSchema.make("en")
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
