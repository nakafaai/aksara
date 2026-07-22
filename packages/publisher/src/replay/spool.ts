import { FileSystem, Path } from "@effect/platform";
import { Effect, type Schema, type Scope, Stream } from "effect";
import {
  type ReplaySpoolError,
  replaySpoolFailure,
} from "#publisher/replay/error";
import {
  decodeReplayRecord,
  encodeReplayRecord,
  validateReplaySpoolUsage,
} from "#publisher/replay/record";

const RECORDS_PER_DIRECTORY = 1000;

/** Immutable disk-backed stream that can be replayed without recomputation. */
export interface ReplaySpool<A> {
  readonly bytes: number;
  readonly count: number;
  /** Replays strictly decoded and hash-verified records in original order. */
  readonly replay: () => Stream.Stream<A, ReplaySpoolError>;
}

interface SpoolState {
  readonly bytes: number;
  readonly count: number;
}

/** Returns one shard and stable record stem without wide directories. */
function recordCoordinate(
  path: typeof Path.Path.Service,
  root: string,
  index: number
) {
  const shard = Math.floor(index / RECORDS_PER_DIRECTORY)
    .toString()
    .padStart(6, "0");
  const stem = index.toString().padStart(12, "0");
  const directory = path.join(root, shard);
  return {
    dataPath: path.join(directory, `${stem}.json`),
    directory,
    hashPath: path.join(directory, `${stem}.sha256`),
  };
}

/** Advances aggregate evidence after all fixed resource ceilings pass. */
function nextSpoolState(state: SpoolState, recordBytes: number, index: number) {
  const next = {
    bytes: state.bytes + recordBytes,
    count: state.count + 1,
  };
  return validateReplaySpoolUsage({
    count: next.count,
    index,
    recordBytes,
    totalBytes: next.bytes,
  }).pipe(Effect.as(next));
}

/** Writes one private hashed record and advances bounded spool evidence. */
function writeRecord<A>(input: {
  readonly fileSystem: typeof FileSystem.FileSystem.Service;
  readonly index: number;
  readonly path: typeof Path.Path.Service;
  readonly root: string;
  readonly state: SpoolState;
  readonly value: A;
}) {
  return Effect.gen(function* () {
    const encoded = yield* encodeReplayRecord(input.value, input.index);
    const next = yield* nextSpoolState(input.state, encoded.bytes, input.index);
    const coordinate = recordCoordinate(input.path, input.root, input.index);
    if (input.index % RECORDS_PER_DIRECTORY === 0) {
      yield* input.fileSystem
        .makeDirectory(coordinate.directory)
        .pipe(
          Effect.mapError((cause) =>
            replaySpoolFailure("write", cause, input.index)
          )
        );
    }
    yield* Effect.all(
      [
        input.fileSystem.writeFileString(coordinate.dataPath, encoded.data, {
          flag: "wx",
          mode: 0o600,
        }),
        input.fileSystem.writeFileString(coordinate.hashPath, encoded.hash, {
          flag: "wx",
          mode: 0o600,
        }),
      ],
      { concurrency: 2 }
    ).pipe(
      Effect.mapError((cause) =>
        replaySpoolFailure("write", cause, input.index)
      )
    );
    return next;
  });
}

/** Reads and authenticates one private spool record. */
function readRecord<A, I>(input: {
  readonly fileSystem: typeof FileSystem.FileSystem.Service;
  readonly index: number;
  readonly path: typeof Path.Path.Service;
  readonly root: string;
  readonly schema: Schema.Schema<A, I, never>;
}) {
  const coordinate = recordCoordinate(input.path, input.root, input.index);
  return Effect.all(
    [
      input.fileSystem.readFileString(coordinate.dataPath, "utf8"),
      input.fileSystem.readFileString(coordinate.hashPath, "utf8"),
    ],
    { concurrency: 2 }
  ).pipe(
    Effect.mapError((cause) => replaySpoolFailure("read", cause, input.index)),
    Effect.flatMap(([data, hash]) =>
      decodeReplayRecord({
        data,
        hash,
        index: input.index,
        schema: input.schema,
      })
    )
  );
}

/** Materializes one bounded stream into scoped private files for exact replay. */
export function createReplaySpool<A, I, E, R>(input: {
  readonly prefix: string;
  readonly schema: Schema.Schema<A, I, never>;
  readonly stream: Stream.Stream<A, E, R>;
}): Effect.Effect<
  ReplaySpool<A>,
  E | ReplaySpoolError,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> {
  return Effect.gen(function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem
      .makeTempDirectoryScoped({ prefix: input.prefix })
      .pipe(Effect.mapError((cause) => replaySpoolFailure("create", cause)));
    const state = yield* input.stream.pipe(
      Stream.zipWithIndex,
      Stream.runFoldEffect({ bytes: 0, count: 0 }, (current, [value, index]) =>
        writeRecord({
          fileSystem,
          index,
          path,
          root,
          state: current,
          value,
        })
      )
    );
    /** Replays each record only while the owning scope remains open. */
    function replay() {
      if (state.count === 0) {
        return Stream.empty;
      }
      return Stream.range(0, state.count - 1).pipe(
        Stream.mapEffect((index) =>
          readRecord({
            fileSystem,
            index,
            path,
            root,
            schema: input.schema,
          })
        )
      );
    }
    return { bytes: state.bytes, count: state.count, replay };
  });
}
