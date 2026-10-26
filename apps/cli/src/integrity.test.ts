import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, FileSystem, HashSet, Path } from "effect";
import {
  captureSelectedFiles,
  fingerprintSelectedDocument,
  verifySelectedFingerprint,
} from "#cli/integrity";
import { selectPreviewDocument } from "#cli/repository";
import { FIXED_FILES, FIXED_SELECTION, readFixedText } from "#test/integrity";
import { makeRepositoryTracker, REPOSITORY_ROOT } from "#test/real";

const repositories = makeRepositoryTracker();
const ARTICLE_PATH =
  "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx";

afterEach(() => repositories.clear());

layer(NodeServices.layer)("preview source integrity", (it) => {
  it.effect(
    "rejects missing or changed files across one compilation closure",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const repository = yield* repositories.create();
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
          ARTICLE_PATH,
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
        expect(
          Arr.map(fingerprint.files, ({ sourcePath }) => sourcePath)
        ).toEqual(Arr.map(selected.files, ({ sourcePath }) => sourcePath));
        expect(
          HashSet.size(
            HashSet.fromIterable(Arr.map(fingerprint.files, ({ hash }) => hash))
          )
        ).toBe(selected.files.length);
      })
  );
});
