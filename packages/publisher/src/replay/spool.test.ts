import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { describe, expect, layer } from "@effect/vitest";
import { webCryptoService } from "@nakafa/aksara-contracts/hash/digest";
import {
  Array as Arr,
  Crypto,
  Effect,
  FileSystem,
  Layer,
  Path,
  PlatformError,
  Schema,
  Stream,
} from "effect";
import { Hex } from "effect/encoding";
import { createReplaySpool } from "#publisher/replay/spool";

const ReplayEntrySchema = Schema.Struct({
  sequence: Schema.Finite,
  value: Schema.String,
});
const firstEntry = { sequence: 1, value: "test-first" };
const secondEntry = { sequence: 2, value: "test-second" };
const entries = [firstEntry, secondEntry];
const nodeLayer = Layer.merge(NodeFileSystem.layer, NodePath.layer);

/** Returns one unique temporary-name prefix drawn from the Effect Crypto service. */
const uniquePrefix = Effect.fn("ReplaySpoolTest.uniquePrefix")(
  function* (label: string) {
    const crypto = yield* Crypto.Crypto;
    const bytes = yield* crypto.randomBytes(16);
    return `${label}-${Hex.encode(bytes)}-`;
  },
  Effect.provideService(Crypto.Crypto, webCryptoService)
);

/** Finds the platform temporary root as the parent of one probe directory it creates. */
const temporaryRoot = Effect.fn("ReplaySpoolTest.temporaryRoot")(function* (
  fileSystem: typeof FileSystem.FileSystem.Service
) {
  const path = yield* Path.Path;
  const probe = yield* Effect.scoped(
    fileSystem.makeTempDirectoryScoped({ prefix: "aksara-probe-" })
  );
  return path.dirname(probe);
});

/** Lists only temporary roots owned by one unique test prefix. */
const listRoots = Effect.fn("ReplaySpoolTest.listRoots")(
  (fileSystem: typeof FileSystem.FileSystem.Service, prefix: string) =>
    Effect.gen(function* () {
      const root = yield* temporaryRoot(fileSystem);
      const names = yield* fileSystem.readDirectory(root);
      return Arr.map(
        Arr.filter(names, (name) => name.startsWith(prefix)),
        (name) => `${root}/${name}`
      );
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
          const prefix = yield* uniquePrefix("aksara-spool");
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
              const selected = yield* spool.read(1);
              return {
                bytes: spool.bytes,
                count: spool.count,
                first: [...first],
                modes: [data.mode % 0o1000, hash.mode % 0o1000],
                second: [...second],
                selected,
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
            selected: secondEntry,
          });
          expect(result.bytes).toBeGreaterThan(0);
        })
    );

    it.effect("rejects a random read outside the sealed spool", () =>
      Effect.scoped(
        Effect.gen(function* () {
          const spool = yield* createReplaySpool({
            prefix: yield* uniquePrefix("aksara-index"),
            schema: ReplayEntrySchema,
            stream: Stream.make(firstEntry),
          });
          const failures = yield* Effect.forEach([-1, 1, 1.5], (index) =>
            spool.read(index).pipe(Effect.flip)
          );

          expect(
            Arr.every(failures, ({ operation }) => operation === "read")
          ).toBe(true);
        })
      )
    );

    it.effect("represents an empty source without creating record shards", () =>
      Effect.scoped(
        Effect.gen(function* () {
          const spool = yield* createReplaySpool({
            prefix: yield* uniquePrefix("aksara-empty"),
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
        const prefix = yield* uniquePrefix("aksara-source");
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
            const prefix = yield* uniquePrefix("aksara-read");
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
