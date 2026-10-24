import { Effect, FileSystem, Schema } from "effect";
import { readSource } from "#scripts/source";

const JsonObject = Schema.fromJsonString(
  Schema.Record(Schema.String, Schema.Unknown)
);

/** The root manifest fields that the dependency policy reads and writes. */
const RootManifestSchema = Schema.Struct({
  devDependencies: Schema.Record(Schema.String, Schema.String),
  devEngines: Schema.Struct({
    runtime: Schema.Struct({ version: Schema.String }),
  }),
  overrides: Schema.Record(Schema.String, Schema.String),
  packageManager: Schema.String,
  workspaces: Schema.Struct({
    catalog: Schema.Record(Schema.String, Schema.String),
    packages: Schema.Array(Schema.String),
  }),
});

/** The root manifest fields that the dependency policy reads. */
export type RootManifest = typeof RootManifestSchema.Type;

/** The declared versions that one routine update writes into each manifest section. */
const DeclaredUpdatesSchema = Schema.Struct({
  catalog: Schema.Record(Schema.String, Schema.String),
  devDependencies: Schema.Record(Schema.String, Schema.String),
  overrides: Schema.Record(Schema.String, Schema.String),
});

/** The type of the declared versions that one routine update writes. */
export type DeclaredUpdates = typeof DeclaredUpdatesSchema.Type;

/** A dependency policy check failed: a reviewed hold drifted or the manifest is not valid. */
export class DependencyPolicyError extends Schema.TaggedError<
  DependencyPolicyError,
  { readonly brand: unique symbol }
>()("DependencyPolicyError", { message: Schema.String }) {}

/** Reads the root manifest as an open JSON object and as the fields the policy owns. */
export const readManifest = Effect.fn("DependencyPolicy.readManifest")(
  function* (path: string) {
    const source = yield* readSource(path).pipe(
      Effect.mapError(
        (error) => new DependencyPolicyError({ message: error.message })
      )
    );
    const document = yield* Schema.decodeEffect(JsonObject)(source).pipe(
      Effect.mapError(
        () => new DependencyPolicyError({ message: `${path} is not valid.` })
      )
    );
    const fields = yield* Schema.decodeUnknownEffect(RootManifestSchema)(
      document
    ).pipe(
      Effect.mapError(
        () =>
          new DependencyPolicyError({
            message: `${path} has an invalid shape.`,
          })
      )
    );
    return { document, fields };
  }
);

/** Writes the declared versions into the root manifest and keeps every other field. */
export const writeManifest = Effect.fn("DependencyPolicy.writeManifest")(
  function* (
    path: string,
    document: Readonly<Record<string, unknown>>,
    fields: RootManifest,
    declared: DeclaredUpdates
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const next = {
      ...document,
      devDependencies: {
        ...fields.devDependencies,
        ...declared.devDependencies,
      },
      overrides: {
        ...fields.overrides,
        ...declared.overrides,
      },
      workspaces: {
        ...fields.workspaces,
        catalog: {
          ...fields.workspaces.catalog,
          ...declared.catalog,
        },
      },
    };
    const text = yield* Schema.encodeEffect(JsonObject)(next);
    yield* fileSystem.writeFileString(path, text);
  }
);
