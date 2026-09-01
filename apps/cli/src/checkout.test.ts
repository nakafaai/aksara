import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, PlatformError } from "effect";
import { findAksaraRoot, resolveNakafaRoot } from "#cli/checkout";
import { makeRepositoryTracker } from "#test/real";

const repositories = makeRepositoryTracker();

afterEach(() => {
  repositories.clear();
});

layer(NodeServices.layer)("preview checkout resolution", (it) => {
  it.effect("finds exact Aksara and Nakafa roots", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const repository = repositories.create();
      const [aksaraRoot, defaultNakafa, explicitNakafa] = yield* Effect.all(
        [
          findAksaraRoot(path.dirname(repository.documentPath)),
          resolveNakafaRoot(repository.aksaraRoot, undefined),
          resolveNakafaRoot(repository.aksaraRoot, repository.nakafaRoot),
        ],
        { concurrency: "unbounded" }
      );

      expect(aksaraRoot).toBe(
        yield* fileSystem.realPath(repository.aksaraRoot)
      );
      expect(defaultNakafa).toBe(
        yield* fileSystem.realPath(repository.nakafaRoot)
      );
      expect(explicitNakafa).toBe(
        yield* fileSystem.realPath(repository.nakafaRoot)
      );
    })
  );

  it.effect("rejects missing roots and malformed checkout identities", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const repository = repositories.create();
      const missing = path.resolve(repository.root, "missing");
      const missingAksara = yield* findAksaraRoot(missing).pipe(Effect.flip);
      const missingNakafa = yield* resolveNakafaRoot(
        repository.aksaraRoot,
        missing
      ).pipe(Effect.flip);
      yield* fileSystem.writeFileString(
        path.resolve(repository.nakafaRoot, "package.json"),
        "not-json"
      );
      const malformedNakafa = yield* resolveNakafaRoot(
        repository.aksaraRoot,
        repository.nakafaRoot
      ).pipe(Effect.flip);
      yield* fileSystem.writeFileString(
        path.resolve(repository.nakafaRoot, "package.json"),
        '{"name":"nakafa"}\n'
      );
      const appManifest = path.resolve(
        repository.nakafaRoot,
        "apps",
        "www",
        "package.json"
      );
      yield* fileSystem.writeFileString(appManifest, '{"name":"not-www"}\n');
      const wrongApp = yield* resolveNakafaRoot(
        repository.aksaraRoot,
        repository.nakafaRoot
      ).pipe(Effect.flip);
      yield* fileSystem.remove(appManifest);
      const missingApp = yield* resolveNakafaRoot(
        repository.aksaraRoot,
        repository.nakafaRoot
      ).pipe(Effect.flip);

      expect(missingAksara).toMatchObject({
        kind: "aksara",
        reason: "missing",
      });
      expect(missingNakafa).toMatchObject({
        kind: "nakafa",
        reason: "missing",
      });
      expect(malformedNakafa).toMatchObject({
        kind: "nakafa",
        reason: "identity",
      });
      expect(wrongApp).toMatchObject({ kind: "nakafa", reason: "identity" });
      expect(missingApp).toMatchObject({
        kind: "nakafa",
        reason: "identity",
      });
    })
  );

  it.effect("maps an identified Aksara root realpath failure", () =>
    Effect.gen(function* () {
      const failure = PlatformError.systemError({
        _tag: "Unknown",
        method: "realPath",
        module: "FileSystem",
        pathOrDescriptor: "/virtual/aksara",
      });
      const fileLayer = FileSystem.layerNoop({
        exists: () => Effect.succeed(true),
        readFileString: () => Effect.succeed('{"name":"aksara"}'),
        realPath: () => Effect.fail(failure),
      });
      const error = yield* findAksaraRoot("/virtual/aksara").pipe(
        Effect.provide([fileLayer, Path.layer]),
        Effect.flip
      );

      expect(error).toMatchObject({ kind: "aksara", reason: "symlink" });
    })
  );

  it.effect(
    "skips malformed ancestor manifests before reporting a missing root",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const repository = repositories.create();
        const malformed = path.resolve(repository.root, "malformed");
        const manifest = path.resolve(malformed, "package.json");
        yield* fileSystem.makeDirectory(malformed);
        yield* fileSystem.writeFileString(manifest, "{");
        const error = yield* findAksaraRoot(malformed).pipe(Effect.flip);
        yield* fileSystem.writeFileString(manifest, '{"name":1}');
        const nonString = yield* findAksaraRoot(malformed).pipe(Effect.flip);

        expect(error).toMatchObject({ kind: "aksara", reason: "missing" });
        expect(nonString).toMatchObject({
          kind: "aksara",
          reason: "missing",
        });
      })
  );
});
