import { realpathSync, symlinkSync, unlinkSync } from "node:fs";
import { relative, resolve } from "node:path";
import { Data, Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { selectCatalogDocument, selectPreviewDocument } from "#cli/repository";
import { runNode } from "#test/effect";
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

const repositories = makeRepositoryTracker();

afterEach(() => {
  registryControl.fail = false;
  registryControl.empty = false;
  repositories.clear();
});

describe("preview repository selection", () => {
  it("selects absolute or relative registry paths", async () => {
    const repository = repositories.create();
    const realAksaraRoot = realpathSync(repository.aksaraRoot);
    const realDocumentPath = realpathSync(repository.documentPath);
    const requested = relative(realAksaraRoot, realDocumentPath);
    const [relativeDocument, absoluteDocument] = await Promise.all([
      runNode(selectPreviewDocument(realAksaraRoot, requested)),
      runNode(selectPreviewDocument(realAksaraRoot, realDocumentPath)),
    ]);

    expect(relativeDocument).toEqual(absoluteDocument);
    expect(relativeDocument.sources[0].entry).toEqual(ENGLISH_ENTRY);
  });

  it("selects one real catalog document and rejects an empty catalog", async () => {
    const selected = await runNode(selectCatalogDocument(REPOSITORY_ROOT));
    expect(selected.sources[0].family).toBe("material");

    registryControl.empty = true;
    const empty = await runNode(
      selectCatalogDocument(REPOSITORY_ROOT).pipe(Effect.flip)
    );
    expect(empty).toMatchObject({ kind: "document", reason: "registry" });

    registryControl.empty = false;
    registryControl.fail = true;
    const failed = await runNode(
      selectCatalogDocument(REPOSITORY_ROOT).pipe(Effect.flip)
    );
    expect(failed).toMatchObject({ kind: "document", reason: "registry" });
  });

  it("rejects unknown, traversal, missing, symlinked, and invalid registry sources", async () => {
    const repository = repositories.create();
    const requested = relative(repository.aksaraRoot, repository.documentPath);
    const traversal = requested.replace(
      "function-concept/en.mdx",
      "function-concept/../function-concept/en.mdx"
    );
    const unknown = await runNode(
      selectPreviewDocument(
        repository.aksaraRoot,
        "packages/corpus/unknown.mdx"
      ).pipe(Effect.flip)
    );
    const traversalError = await runNode(
      selectPreviewDocument(repository.aksaraRoot, traversal).pipe(Effect.flip)
    );
    unlinkSync(repository.documentPath);
    const missing = await runNode(
      selectPreviewDocument(repository.aksaraRoot, requested).pipe(Effect.flip)
    );
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
    );
    const symlink = await runNode(
      selectPreviewDocument(repository.aksaraRoot, requested).pipe(Effect.flip)
    );
    registryControl.fail = true;
    const registry = await runNode(
      selectPreviewDocument(repository.aksaraRoot, requested).pipe(Effect.flip)
    );

    expect(unknown).toMatchObject({ kind: "document", reason: "registry" });
    expect(traversalError).toMatchObject({
      kind: "document",
      reason: "registry",
    });
    expect(missing).toMatchObject({ kind: "document", reason: "missing" });
    expect(symlink).toMatchObject({ kind: "document", reason: "symlink" });
    expect(registry).toMatchObject({ kind: "document", reason: "registry" });
  });
});
