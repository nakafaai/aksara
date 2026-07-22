import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { FileSystem, Error as PlatformError } from "@effect/platform";
import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { Effect, Layer, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { createReplaySpool } from "#publisher/replay/spool";

const ReplayEntrySchema = Schema.Struct({
  sequence: Schema.Number,
  value: Schema.String,
});
const firstEntry = { sequence: 1, value: "test-first" };
const secondEntry = { sequence: 2, value: "test-second" };
const entries = [firstEntry, secondEntry];
const nodeLayer = Layer.merge(NodeFileSystem.layer, NodePath.layer);

/** Lists only temporary roots owned by one unique test prefix. */
function listRoots(
  fileSystem: typeof FileSystem.FileSystem.Service,
  prefix: string
) {
  return fileSystem
    .readDirectory(tmpdir())
    .pipe(
      Effect.map((names) => names.filter((name) => name.startsWith(prefix)))
    );
}

/** Requires the one scoped temporary root created by a test. */
function requireRoot(
  fileSystem: typeof FileSystem.FileSystem.Service,
  prefix: string
) {
  return listRoots(fileSystem, prefix).pipe(
    Effect.flatMap((roots) =>
      roots.length === 1
        ? Effect.succeed(`${tmpdir()}/${roots[0]}`)
        : Effect.dieMessage(
            `Expected one replay root, received ${roots.length}.`
          )
    )
  );
}

/** Runs one replay program with the real scoped Node filesystem. */
function runNode<A, E>(
  program: Effect.Effect<
    A,
    E,
    FileSystem.FileSystem | import("@effect/platform/Path").Path
  >
) {
  return Effect.runPromise(program.pipe(Effect.provide(nodeLayer)));
}

/** Creates one deterministic platform error for filesystem mapping tests. */
function fileFailure(method: string) {
  return new PlatformError.SystemError({
    method,
    module: "FileSystem",
    reason: "PermissionDenied",
  });
}

describe("replay spool", () => {
  it("replays private records exactly and removes its scoped directory", async () => {
    const prefix = `aksara-spool-${randomUUID()}-`;
    const result = await runNode(
      Effect.gen(function* () {
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
            const first = yield* spool.replay().pipe(Stream.runCollect);
            const second = yield* spool.replay().pipe(Stream.runCollect);
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
        return { ...scoped, remaining };
      })
    );

    expect(result).toMatchObject({
      count: 2,
      first: entries,
      modes: [0o600, 0o600],
      remaining: [],
      second: entries,
    });
    expect(result.bytes).toBeGreaterThan(0);
  });

  it("represents an empty source without creating record shards", async () => {
    const result = await runNode(
      Effect.scoped(
        Effect.gen(function* () {
          const spool = yield* createReplaySpool({
            prefix: `aksara-empty-${randomUUID()}-`,
            schema: ReplayEntrySchema,
            stream: Stream.empty,
          });
          const records = yield* spool.replay().pipe(Stream.runCollect);
          return {
            bytes: spool.bytes,
            count: spool.count,
            records: [...records],
          };
        })
      )
    );
    expect(result).toEqual({ bytes: 0, count: 0, records: [] });
  });

  it("preserves a source failure and still removes scoped files", async () => {
    const prefix = `aksara-source-${randomUUID()}-`;
    const result = await runNode(
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const error = yield* Effect.scoped(
          createReplaySpool({
            prefix,
            schema: ReplayEntrySchema,
            stream: Stream.fail("test-source-failure"),
          })
        ).pipe(Effect.flip);
        const remaining = yield* listRoots(fileSystem, prefix);
        return { error, remaining };
      })
    );
    expect(result).toEqual({ error: "test-source-failure", remaining: [] });
  });

  it("maps temporary-directory creation failures", async () => {
    const fileLayer = FileSystem.layerNoop({
      makeTempDirectoryScoped: () => Effect.fail(fileFailure("create")),
    });
    const error = await Effect.runPromise(
      Effect.scoped(
        createReplaySpool({
          prefix: "aksara-create-test-",
          schema: ReplayEntrySchema,
          stream: Stream.empty,
        })
      ).pipe(
        Effect.provide(fileLayer),
        Effect.provide(NodePath.layer),
        Effect.flip
      )
    );
    expect(error).toMatchObject({ operation: "create" });
  });

  it.each(["directory", "record"])(
    "maps %s write failures without leaking platform errors",
    async (stage) => {
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
      const error = await Effect.runPromise(
        Effect.scoped(
          createReplaySpool({
            prefix: "aksara-write-test-",
            schema: ReplayEntrySchema,
            stream: Stream.make(firstEntry),
          })
        ).pipe(
          Effect.provide(fileLayer),
          Effect.provide(NodePath.layer),
          Effect.flip
        )
      );
      expect(error).toMatchObject({ index: 0, operation: "write" });
    }
  );

  it("maps missing replay files after successful materialization", async () => {
    const prefix = `aksara-read-${randomUUID()}-`;
    const error = await runNode(
      Effect.scoped(
        Effect.gen(function* () {
          const fileSystem = yield* FileSystem.FileSystem;
          const spool = yield* createReplaySpool({
            prefix,
            schema: ReplayEntrySchema,
            stream: Stream.make(firstEntry),
          });
          const root = yield* requireRoot(fileSystem, prefix);
          yield* fileSystem.remove(`${root}/000000/000000000000.json`);
          return yield* spool.replay().pipe(Stream.runCollect, Effect.flip);
        })
      )
    );
    expect(error).toMatchObject({ index: 0, operation: "read" });
  });
});
