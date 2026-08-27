import { realpathSync, symlinkSync, unlinkSync } from "node:fs";
import { relative, resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Data, Effect } from "effect";
import { vi } from "vitest";

import { selectCatalogDocument, selectPreviewDocument } from "#cli/repository";
import {
  ENGLISH_ENTRY,
  makeRepositoryTracker,
  REPOSITORY_ROOT,
} from "#test/real";

const registryControl = vi.hoisted(() => ({ empty: false, fail: false }));

/** Test-only typed failure for the mocked material registry boundary. */
class TestRegistryError extends Data.TaggedError("TestRegistryError") {}

vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const registry =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  return {
    ...registry,
    /** Injects one registry failure without changing its production contract. */
    decodeMaterialRegistry: () => {
      if (registryControl.fail) {
        return Effect.fail(new TestRegistryError());
      }
      if (registryControl.empty) {
        return Effect.succeed([]);
      }
      return registry.decodeMaterialRegistry();
    },
  };
});

vi.mock("@nakafa/aksara-corpus/preview/selection", async (importOriginal) => {
  const selection =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/preview/selection")
    >();
  return {
    ...selection,
    /** Injects one corpus selection failure at the CLI repository boundary. */
    selectPreviewDocument: (
      ...input: Parameters<typeof selection.selectPreviewDocument>
    ) => {
      if (registryControl.fail) {
        return Effect.fail(new TestRegistryError());
      }
      return selection.selectPreviewDocument(...input);
    },
  };
});

const repositories = makeRepositoryTracker();

afterEach(() => {
  registryControl.fail = false;
  registryControl.empty = false;
  repositories.clear();
});

layer(NodeServices.layer)("preview repository selection", (it) => {
  it.effect("selects absolute or relative registry paths", () =>
    Effect.gen(function* () {
      const repository = yield* Effect.sync(repositories.create);
      const { realAksaraRoot, realDocumentPath } = yield* Effect.sync(() => ({
        realAksaraRoot: realpathSync(repository.aksaraRoot),
        realDocumentPath: realpathSync(repository.documentPath),
      }));
      const requested = relative(realAksaraRoot, realDocumentPath);
      const [relativeDocument, absoluteDocument] = yield* Effect.all([
        selectPreviewDocument(realAksaraRoot, requested),
        selectPreviewDocument(realAksaraRoot, realDocumentPath),
      ]);

      expect(relativeDocument).toEqual(absoluteDocument);
      expect(relativeDocument.sources[0].entry).toEqual(ENGLISH_ENTRY);
    })
  );

  it.effect("preserves an actionable explicit application-locale failure", () =>
    Effect.gen(function* () {
      const repository = yield* Effect.sync(repositories.create);
      const requested = relative(
        repository.aksaraRoot,
        repository.documentPath
      );
      const error = yield* selectPreviewDocument(
        repository.aksaraRoot,
        requested,
        AppLocaleSchema.make("de")
      ).pipe(Effect.flip);

      expect(error).toMatchObject({ reason: "app-locale" });
    })
  );

  it.effect(
    "selects one real catalog document and rejects an empty catalog",
    () =>
      Effect.gen(function* () {
        const selected = yield* selectCatalogDocument(REPOSITORY_ROOT);
        expect(selected.sources[0].family).toBe("material");

        registryControl.empty = true;
        const empty = yield* selectCatalogDocument(REPOSITORY_ROOT).pipe(
          Effect.flip
        );
        expect(empty).toMatchObject({ kind: "document", reason: "registry" });

        registryControl.empty = false;
        registryControl.fail = true;
        const failed = yield* selectCatalogDocument(REPOSITORY_ROOT).pipe(
          Effect.flip
        );
        expect(failed).toMatchObject({
          kind: "document",
          reason: "registry",
        });
      })
  );

  it.effect(
    "rejects unknown, traversal, missing, symlinked, and invalid registry sources",
    () =>
      Effect.gen(function* () {
        const repository = yield* Effect.sync(repositories.create);
        const requested = relative(
          repository.aksaraRoot,
          repository.documentPath
        );
        const traversal = requested.replace(
          "function-concept/en.mdx",
          "function-concept/../function-concept/en.mdx"
        );
        const unknown = yield* selectPreviewDocument(
          repository.aksaraRoot,
          "packages/corpus/unknown.mdx"
        ).pipe(Effect.flip);
        const traversalError = yield* selectPreviewDocument(
          repository.aksaraRoot,
          traversal
        ).pipe(Effect.flip);
        yield* Effect.sync(() => unlinkSync(repository.documentPath));
        const missing = yield* selectPreviewDocument(
          repository.aksaraRoot,
          requested
        ).pipe(Effect.flip);
        yield* Effect.sync(() =>
          symlinkSync(
            resolve(
              repository.aksaraRoot,
              "packages",
              "corpus",
              "material",
              "lesson",
              "mathematics",
              "function-composition-inverse-function",
              "function-concept",
              "id.mdx"
            ),
            repository.documentPath
          )
        );
        const symlink = yield* selectPreviewDocument(
          repository.aksaraRoot,
          requested
        ).pipe(Effect.flip);
        registryControl.fail = true;
        const registry = yield* selectPreviewDocument(
          repository.aksaraRoot,
          requested
        ).pipe(Effect.flip);

        expect(unknown).toMatchObject({
          kind: "document",
          reason: "registry",
        });
        expect(traversalError).toMatchObject({
          kind: "document",
          reason: "registry",
        });
        expect(missing).toMatchObject({ kind: "document", reason: "missing" });
        expect(symlink).toMatchObject({ kind: "document", reason: "symlink" });
        expect(registry).toMatchObject({
          kind: "document",
          reason: "registry",
        });
      })
  );
});
