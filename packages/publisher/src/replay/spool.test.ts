import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { describe, expect, layer } from "@effect/vitest";
import {
  Effect,
  FileSystem,
  Layer,
  PlatformError,
  Schema,
  Stream,
} from "effect";
import { createReplaySpool } from "#publisher/replay/spool";

const ReplayEntrySchema = Schema.Struct({
  sequence: Schema.Finite,
  value: Schema.String,
});
const firstEntry = { sequence: 1, value: "test-first" };
const secondEntry = { sequence: 2, value: "test-second" };
const entries = [firstEntry, secondEntry];
const nodeLayer = Layer.merge(NodeFileSystem.layer, NodePath.layer);

/** Lists only temporary roots owned by one unique test prefix. */
const listRoots = Effect.fn("ReplaySpoolTest.listRoots")(
  (fileSystem: typeof FileSystem.FileSystem.Service, prefix: string) =>
    Effect.gen(function* () {
      const temporaryRoot = yield* Effect.sync(tmpdir);
      const names = yield* fileSystem.readDirectory(temporaryRoot);
      return names
        .filter((name) => name.startsWith(prefix))
        .map((name) => `${temporaryRoot}/${name}`);
    })
);

/** Requires the one scoped temporary root created by a test. */
const requireRoot = Effect.fn("ReplaySpoolTest.requireRoot")(
  (fileSystem: typeof FileSystem.FileSystem.Service, prefix: string) =>
    listRoots(fileSystem, prefix).pipe(
      Effect.flatMap((roots) => {
        const [root] = roots;
        return root !== undefined && roots.length === 1
          ? Effect.succeed(root)
          : Effect.die(
              new Error(`Expected one replay root, received ${roots.length}.`)
            );
      })
    )
);

/** Creates one deterministic platform error for filesystem mapping tests. */
function fileFailure(method: string) {
  return PlatformError.systemError({
    _tag: "PermissionDenied",
    method,
    module: "FileSystem",
  });
}

describe("replay spool", () => {
  layer(nodeLayer)((it) => {
    it.effect(
      "replays private records exactly and removes its scoped directory",
      () =>
        Effect.gen(function* () {
          const prefix = yield* Effect.sync(
            () => `aksara-spool-${randomUUID()}-`
          );
          const fileSystem = yield* FileSystem.FileSystem;
          const scoped = yield* Effect.scoped(
            Effect.gen(function* () {
              const spool = yield* createReplaySpool({
                prefix,
                schema: ReplayEntrySchema,
                stream: Stream.fromIterable(entries),
              });
              const root = yield* requireRoot(fileSystem, prefix);
              const data = yield* fileSystem.stat(
                `${root}/000000/000000000000.json`
              );
              const hash = yield* fileSystem.stat(
                `${root}/000000/000000000000.sha256`
              );
              const first = yield* spool.replay.pipe(Stream.runCollect);
              const second = yield* spool.replay.pipe(Stream.runCollect);
              return {
                bytes: spool.bytes,
                count: spool.count,
                first: [...first],
                modes: [data.mode % 0o1000, hash.mode % 0o1000],
                second: [...second],
              };
            })
          );
          const remaining = yield* listRoots(fileSystem, prefix);
          const result = { ...scoped, remaining };

          expect(result).toMatchObject({
            count: 2,
            first: entries,
            modes: [0o600, 0o600],
            remaining: [],
            second: entries,
          });
          expect(result.bytes).toBeGreaterThan(0);
        })
    );

    it.effect("represents an empty source without creating record shards", () =>
      Effect.scoped(
        Effect.gen(function* () {
          const spool = yield* createReplaySpool({
            prefix: yield* Effect.sync(() => `aksara-empty-${randomUUID()}-`),
            schema: ReplayEntrySchema,
            stream: Stream.empty,
          });
          const records = yield* spool.replay.pipe(Stream.runCollect);
          expect({
            bytes: spool.bytes,
            count: spool.count,
            records: [...records],
          }).toEqual({ bytes: 0, count: 0, records: [] });
        })
      )
    );

    it.effect("preserves a source failure and still removes scoped files", () =>
      Effect.gen(function* () {
        const prefix = yield* Effect.sync(
          () => `aksara-source-${randomUUID()}-`
        );
        const fileSystem = yield* FileSystem.FileSystem;
        const error = yield* Effect.scoped(
          createReplaySpool({
            prefix,
            schema: ReplayEntrySchema,
            stream: Stream.fail("test-source-failure"),
          })
        ).pipe(Effect.flip);
        const remaining = yield* listRoots(fileSystem, prefix);
        expect({ error, remaining }).toEqual({
          error: "test-source-failure",
          remaining: [],
        });
      })
    );

    it.effect("maps temporary-directory creation failures", () => {
      const fileLayer = FileSystem.layerNoop({
        makeTempDirectoryScoped: () => Effect.fail(fileFailure("create")),
      });
      return Effect.scoped(
        createReplaySpool({
          prefix: "aksara-create-test-",
          schema: ReplayEntrySchema,
          stream: Stream.empty,
        })
      ).pipe(
        Effect.provide(fileLayer),
        Effect.flip,
        Effect.map((error) =>
          expect(error).toMatchObject({ operation: "create" })
        )
      );
    });

    it.effect.each(["directory", "record"] as const)(
      "maps %s write failures without leaking platform errors",
      (stage) => {
        const fileLayer = FileSystem.layerNoop({
          makeDirectory: () =>
            stage === "directory"
              ? Effect.fail(fileFailure("makeDirectory"))
              : Effect.void,
          makeTempDirectoryScoped: () => Effect.succeed("/test/aksara-spool"),
          writeFileString: () =>
            stage === "record"
              ? Effect.fail(fileFailure("writeFileString"))
              : Effect.void,
        });
        return Effect.scoped(
          createReplaySpool({
            prefix: "aksara-write-test-",
            schema: ReplayEntrySchema,
            stream: Stream.make(firstEntry),
          })
        ).pipe(
          Effect.provide(fileLayer),
          Effect.flip,
          Effect.map((error) =>
            expect(error).toMatchObject({ index: 0, operation: "write" })
          )
        );
      }
    );

    it.effect(
      "maps missing replay files after successful materialization",
      () =>
        Effect.scoped(
          Effect.gen(function* () {
            const prefix = yield* Effect.sync(
              () => `aksara-read-${randomUUID()}-`
            );
            const fileSystem = yield* FileSystem.FileSystem;
            const spool = yield* createReplaySpool({
              prefix,
              schema: ReplayEntrySchema,
              stream: Stream.make(firstEntry),
            });
            const root = yield* requireRoot(fileSystem, prefix);
            yield* fileSystem.remove(`${root}/000000/000000000000.json`);
            const error = yield* spool.replay.pipe(
              Stream.runCollect,
              Effect.flip
            );
            expect(error).toMatchObject({ index: 0, operation: "read" });
          })
        )
    );
  });
});
