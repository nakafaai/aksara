import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Effect, FileSystem, Path, Schema } from "effect";

/** The signed genesis runtime bundle could not be persisted exclusively. */
export class GenesisBundleWriteError extends Schema.TaggedError<GenesisBundleWriteError>()(
  "GenesisBundleWriteError",
  {}
) {}

/** Returns the single newline-terminated runtime bundle representation. */
export function encodeGenesisBundle(bundle: SignedTryoutRuntimeBundle) {
  return `${JSON.stringify(bundle)}\n`;
}

/** Durably writes and rereads one signed bundle without overwriting a file. */
export const writeGenesisBundle = Effect.fn("AksaraCli.writeGenesisBundle")(
  function* (bundlePath: string, bundle: SignedTryoutRuntimeBundle) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const bytes = encodeGenesisBundle(bundle);
    const encoded = new TextEncoder().encode(bytes);
    const directory = path.dirname(bundlePath);
    yield* Effect.scoped(
      Effect.gen(function* () {
        const temporaryPath = yield* fileSystem.makeTempFileScoped({
          directory,
          prefix: ".aksara-genesis-",
        });
        yield* fileSystem.chmod(temporaryPath, 0o600);
        const file = yield* fileSystem.open(temporaryPath, { flag: "w" });
        yield* file.writeAll(encoded);
        yield* file.sync;
        yield* fileSystem
          .link(temporaryPath, bundlePath)
          .pipe(
            Effect.catchTag("PlatformError", (error) =>
              error.reason._tag === "AlreadyExists"
                ? Effect.void
                : Effect.fail(new GenesisBundleWriteError())
            )
          );
        const parent = yield* fileSystem.open(directory, { flag: "r" });
        yield* parent.sync;
      }).pipe(Effect.mapError(() => new GenesisBundleWriteError()))
    );
    const persisted = yield* fileSystem
      .readFileString(bundlePath, "utf8")
      .pipe(Effect.mapError(() => new GenesisBundleWriteError()));
    if (persisted !== bytes) {
      return yield* new GenesisBundleWriteError();
    }
    return bundle;
  }
);
