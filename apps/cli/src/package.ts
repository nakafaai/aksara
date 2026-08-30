import { fileURLToPath } from "node:url";
import { Effect, FileSystem, Schema } from "effect";

const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

export const REQUIRED_PACKED_FILES = [
  "LICENSE",
  "NOTICE",
  "README.md",
  "dist/main.js",
  "package.json",
];

const PackageMetadataSchema = Schema.fromJsonString(
  Schema.Struct({
    version: Schema.String.pipe(
      Schema.check(Schema.isPattern(VERSION_PATTERN))
    ),
  })
);

/** Installed npm metadata is missing or does not satisfy the CLI contract. */
export class CliPackageError extends Schema.TaggedError<CliPackageError>()(
  "CliPackageError",
  {
    cause: Schema.Unknown,
    reason: Schema.Literals(["invalid", "missing"]),
  }
) {}

/** Reads and validates the version bundled with the installed CLI package. */
export const readPackageVersion = Effect.fn("AksaraCli.readPackageVersion")(
  function* (packageUrl: URL) {
    const fileSystem = yield* FileSystem.FileSystem;
    const source = yield* fileSystem
      .readFileString(fileURLToPath(packageUrl))
      .pipe(
        Effect.mapError(
          (cause) => new CliPackageError({ cause, reason: "missing" })
        )
      );
    return yield* Schema.decodeEffect(PackageMetadataSchema)(source).pipe(
      Effect.mapError(
        (cause) => new CliPackageError({ cause, reason: "invalid" })
      ),
      Effect.map(({ version }) => version)
    );
  }
);

/** Keeps source, tests, and workspace-only files out of the npm tarball. */
export function isAllowedPackedFile(path: string) {
  return REQUIRED_PACKED_FILES.includes(path);
}
