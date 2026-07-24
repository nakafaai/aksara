import { mkdirSync, realpathSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import { findAksaraRoot, resolveNakafaRoot } from "#cli/checkout";
import { runNode } from "#test/effect";
import { makeRepositoryTracker } from "#test/real";

const repositories = makeRepositoryTracker();

afterEach(() => {
  repositories.clear();
});

describe("preview checkout resolution", () => {
  it("finds exact Aksara and Nakafa roots", async () => {
    const repository = repositories.create();
    const [aksaraRoot, defaultNakafa, explicitNakafa] = await Promise.all([
      runNode(findAksaraRoot(dirname(repository.documentPath))),
      runNode(resolveNakafaRoot(repository.aksaraRoot, undefined)),
      runNode(resolveNakafaRoot(repository.aksaraRoot, repository.nakafaRoot)),
    ]);

    expect(aksaraRoot).toBe(realpathSync(repository.aksaraRoot));
    expect(defaultNakafa).toBe(realpathSync(repository.nakafaRoot));
    expect(explicitNakafa).toBe(realpathSync(repository.nakafaRoot));
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
