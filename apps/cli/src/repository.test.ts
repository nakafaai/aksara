import { NodeServices } from "@effect/platform-node";
import { beforeEach, expect, layer } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Data, Effect, FileSystem, Path } from "effect";
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

/** Acquires one repository pair and removes it when the test scope closes. */
const acquireRepository = Effect.fn("AksaraCliTest.acquireRepository")(
  function* () {
    return yield* Effect.acquireRelease(
      Effect.sync(() => repositories.create()),
      () => Effect.sync(() => repositories.clear())
    );
  }
);

beforeEach(() => {
  registryControl.fail = false;
  registryControl.empty = false;
});

layer(NodeServices.layer)("preview repository selection", (it) => {
  it.effect("selects absolute or relative registry paths", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const repository = yield* acquireRepository();
      const realAksaraRoot = yield* fileSystem.realPath(repository.aksaraRoot);
      const realDocumentPath = yield* fileSystem.realPath(
        repository.documentPath
      );
      const requested = path.relative(realAksaraRoot, realDocumentPath);
      const [relativeDocument, absoluteDocument] = yield* Effect.all(
        [
          selectPreviewDocument(realAksaraRoot, requested),
          selectPreviewDocument(realAksaraRoot, realDocumentPath),
        ],
        { concurrency: "unbounded" }
      );
      expect(relativeDocument).toEqual(absoluteDocument);
      expect(relativeDocument.sources[0].entry).toEqual(ENGLISH_ENTRY);
    })
  );

  it.effect("preserves an actionable explicit application-locale failure", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const repository = yield* acquireRepository();
      const requested = path.relative(
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
        expect(failed).toMatchObject({ kind: "document", reason: "registry" });
      })
  );

  it.effect(
    "rejects unknown, traversal, missing, symlinked, and invalid registry sources",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const repository = yield* acquireRepository();
        const requested = path.relative(
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
        yield* fileSystem.remove(repository.documentPath);
        const missing = yield* selectPreviewDocument(
          repository.aksaraRoot,
          requested
        ).pipe(Effect.flip);
        yield* fileSystem.symlink(
          path.resolve(
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
        expect(unknown).toMatchObject({ kind: "document", reason: "registry" });
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
