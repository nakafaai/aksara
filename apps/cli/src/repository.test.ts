import {
  mkdirSync,
  realpathSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  findAksaraRoot,
  resolveNakafaRoot,
  selectPreviewDocument,
} from "#cli/repository";
import { ENGLISH_ENTRY, makeRepositoryTracker } from "#test/real";

const registryControl = vi.hoisted(() => ({ fail: false }));

vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const registry =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  return {
    ...registry,
    /** Injects one registry failure without changing its production contract. */
    decodeMaterialRegistry: () =>
      registryControl.fail
        ? Effect.fail(new Error("Test-only registry failure."))
        : registry.decodeMaterialRegistry(),
  };
});

const repositories = makeRepositoryTracker();

afterEach(() => {
  registryControl.fail = false;
  repositories.clear();
});

/** Runs a filesystem program through the production Node platform layer. */
function runNode<A, E>(
  program: Effect.Effect<A, E, FileSystem.FileSystem | Path.Path>
) {
  return Effect.runPromise(program.pipe(Effect.provide(NodeContext.layer)));
}

describe("preview repository resolution", () => {
  it("finds exact roots and selects absolute or relative registry paths", async () => {
    const repository = repositories.create();
    const nested = dirname(repository.documentPath);
    const realAksaraRoot = realpathSync(repository.aksaraRoot);
    const realDocumentPath = realpathSync(repository.documentPath);
    const requested = relative(realAksaraRoot, realDocumentPath);
    const [
      aksaraRoot,
      defaultNakafa,
      explicitNakafa,
      relativeDocument,
      absoluteDocument,
    ] = await Promise.all([
      runNode(findAksaraRoot(nested)),
      runNode(resolveNakafaRoot(repository.aksaraRoot, undefined)),
      runNode(resolveNakafaRoot(repository.aksaraRoot, repository.nakafaRoot)),
      runNode(selectPreviewDocument(realAksaraRoot, requested)),
      runNode(selectPreviewDocument(realAksaraRoot, realDocumentPath)),
    ]);

    expect(aksaraRoot).toBe(realAksaraRoot);
    expect(defaultNakafa).toBe(realpathSync(repository.nakafaRoot));
    expect(explicitNakafa).toBe(realpathSync(repository.nakafaRoot));
    expect(relativeDocument).toEqual(absoluteDocument);
    expect(relativeDocument.entry).toEqual(ENGLISH_ENTRY);
  });

  it("rejects missing roots and malformed checkout identities", async () => {
    const repository = repositories.create();
    const missing = resolve(repository.root, "missing");
    const missingAksara = await runNode(
      findAksaraRoot(missing).pipe(Effect.flip)
    );
    const missingNakafa = await runNode(
      resolveNakafaRoot(repository.aksaraRoot, missing).pipe(Effect.flip)
    );
    writeFileSync(resolve(repository.nakafaRoot, "package.json"), "not-json");
    const malformedNakafa = await runNode(
      resolveNakafaRoot(repository.aksaraRoot, repository.nakafaRoot).pipe(
        Effect.flip
      )
    );
    writeFileSync(
      resolve(repository.nakafaRoot, "package.json"),
      '{"name":"nakafa"}\n'
    );
    writeFileSync(
      resolve(repository.nakafaRoot, "apps", "www", "package.json"),
      '{"name":"not-www"}\n'
    );
    const wrongApp = await runNode(
      resolveNakafaRoot(repository.aksaraRoot, repository.nakafaRoot).pipe(
        Effect.flip
      )
    );
    unlinkSync(resolve(repository.nakafaRoot, "apps", "www", "package.json"));
    const missingApp = await runNode(
      resolveNakafaRoot(repository.aksaraRoot, repository.nakafaRoot).pipe(
        Effect.flip
      )
    );

    expect(missingAksara).toMatchObject({ kind: "aksara", reason: "missing" });
    expect(missingNakafa).toMatchObject({ kind: "nakafa", reason: "missing" });
    expect(malformedNakafa).toMatchObject({
      kind: "nakafa",
      reason: "identity",
    });
    expect(wrongApp).toMatchObject({ kind: "nakafa", reason: "identity" });
    expect(missingApp).toMatchObject({ kind: "nakafa", reason: "identity" });
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

  it("maps an identified Aksara root realpath failure", async () => {
    const failure = new PlatformError.SystemError({
      method: "realPath",
      module: "FileSystem",
      pathOrDescriptor: "/virtual/aksara",
      reason: "Unknown",
    });
    const fileLayer = FileSystem.layerNoop({
      exists: () => Effect.succeed(true),
      readFileString: () => Effect.succeed('{"name":"aksara"}'),
      realPath: () => Effect.fail(failure),
    });
    const error = await Effect.runPromise(
      findAksaraRoot("/virtual/aksara").pipe(
        Effect.provide(fileLayer),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({ kind: "aksara", reason: "symlink" });
  });

  it("skips malformed ancestor manifests before reporting a missing root", async () => {
    const repository = repositories.create();
    const malformed = resolve(repository.root, "malformed");
    mkdirSync(malformed);
    writeFileSync(resolve(malformed, "package.json"), "{");
    const error = await runNode(findAksaraRoot(malformed).pipe(Effect.flip));
    writeFileSync(resolve(malformed, "package.json"), '{"name":1}');
    const nonString = await runNode(
      findAksaraRoot(malformed).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ kind: "aksara", reason: "missing" });
    expect(nonString).toMatchObject({ kind: "aksara", reason: "missing" });
  });
});
