import { Effect, Equal, Record as Rec, Schema, String as Str } from "effect";
import { isObject, isString } from "effect/Predicate";
import { JsonTextSchema } from "#contracts/text/json";
import { encodePrettyJsonText } from "#scripts/text/json";

const DEPENDENCY_SECTIONS = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
] as const;
const WORKSPACE_PROTOCOL_PATTERN = /^(?:catalog:|workspace:)/u;
const SOURCE_CONDITION = "aksara-source";

type DependencySection = (typeof DEPENDENCY_SECTIONS)[number];

const DependencyMapSchema = Schema.Record(Schema.String, Schema.String);

/** Package fields required by isolated tarball verification. */
export const PackageManifestSchema = Schema.Struct({
  dependencies: Schema.UndefinedOr(DependencyMapSchema),
  description: Schema.String,
  devDependencies: Schema.UndefinedOr(DependencyMapSchema),
  engines: Schema.Struct({ node: Schema.String }),
  exports: Schema.Record(Schema.String, Schema.Unknown),
  homepage: Schema.String,
  imports: Schema.Record(Schema.String, Schema.Unknown),
  license: Schema.String,
  name: Schema.String,
  optionalDependencies: Schema.UndefinedOr(DependencyMapSchema),
  peerDependencies: Schema.UndefinedOr(DependencyMapSchema),
  repository: Schema.Struct({
    directory: Schema.String,
    type: Schema.String,
    url: Schema.String,
  }),
});

/** Package fields required by isolated tarball verification, as read from package.json. */
export type PackageManifest = typeof PackageManifestSchema.Type;

/** A package manifest that breaks the shape or the metadata a release requires. */
export class ManifestError extends Schema.TaggedError<
  ManifestError,
  { readonly brand: unique symbol }
>()("ManifestError", { message: Schema.String }) {}

/** Succeeds when the condition holds, and fails with the message otherwise. */
export function requireManifest(
  condition: boolean,
  message: string
): Effect.Effect<void, ManifestError> {
  return condition ? Effect.void : Effect.fail(new ManifestError({ message }));
}

/** Requires one unknown manifest field to be an object. */
function objectField(
  value: unknown,
  message: string
): Effect.Effect<Readonly<Record<string, unknown>>, ManifestError> {
  return isObject(value)
    ? Effect.succeed(value)
    : Effect.fail(new ManifestError({ message }));
}

/** Requires one unknown manifest field to be text. */
export function textField(
  value: unknown,
  message: string
): Effect.Effect<string, ManifestError> {
  return isString(value)
    ? Effect.succeed(value)
    : Effect.fail(new ManifestError({ message }));
}

/** Decodes JSON text into an object, naming the manifest when it is not one. */
const manifestObject = Effect.fn("AksaraContracts.manifestObject")(function* (
  source: string,
  message: string
) {
  const parsed = yield* Schema.decodeEffect(JsonTextSchema)(source);
  return yield* objectField(parsed, message);
});

/** Verifies the public identity and provenance metadata of the contracts package. */
export const assertContractPackageMetadata = Effect.fn(
  "AksaraContracts.assertContractPackageMetadata"
)(function* (manifest: PackageManifest) {
  yield* requireManifest(
    Str.isNonEmpty(manifest.description.trim()),
    "The contract package description must not be empty"
  );
  yield* requireManifest(
    manifest.homepage === "https://github.com/nakafaai/aksara#readme",
    "The contract package must link to the reviewed Aksara homepage"
  );
  yield* requireManifest(
    Equal.equals(manifest.repository, {
      directory: "packages/contracts",
      type: "git",
      url: "git+https://github.com/nakafaai/aksara.git",
    }),
    "The contract package must identify its exact source repository directory"
  );
});

/** Rejects workspace-only dependency protocols in a portable release archive. */
export const assertPortableDependencies = Effect.fn(
  "AksaraContracts.assertPortableDependencies"
)(function* (manifest: PackageManifest) {
  for (const section of DEPENDENCY_SECTIONS) {
    for (const version of Rec.values(manifest[section] ?? {})) {
      yield* requireManifest(
        !WORKSPACE_PROTOCOL_PATTERN.test(version),
        `Released ${section} must use portable versions`
      );
    }
  }
});

/** Removes repository-only source resolution from one released export map. */
const releasedExports = Effect.fn("AksaraContracts.releasedExports")(function* (
  value: unknown
) {
  const exports = yield* objectField(
    value,
    "Package exports must be an object"
  );
  const released: Record<string, Readonly<Record<string, unknown>>> = {};
  for (const [subpath, descriptor] of Rec.toEntries(exports)) {
    const conditions = yield* objectField(
      descriptor,
      `Export ${subpath} must be an object`
    );
    released[subpath] = Rec.filter(
      conditions,
      (_, condition) => condition !== SOURCE_CONDITION
    );
  }
  return released;
});

/** Serializes the remote archive manifest without workspace source targets. */
export const createReleaseManifest = Effect.fn(
  "AksaraContracts.createReleaseManifest"
)(function* (source: string, effectVersion: string) {
  const parsed = yield* manifestObject(
    source,
    "The package manifest must be an object"
  );
  const peerDependencies = yield* objectField(
    parsed.peerDependencies,
    "peerDependencies must exist"
  );
  const {
    devDependencies: _devDependencies,
    exports: packageExports,
    imports: _packageImports,
    scripts: _scripts,
    ...released
  } = parsed;
  const manifest = {
    ...released,
    exports: yield* releasedExports(packageExports),
    imports: {
      "#contracts/*": {
        default: "./dist/*.js",
        types: "./dist/*.d.ts",
      },
    },
    peerDependencies: {
      ...peerDependencies,
      effect: effectVersion,
    },
  };
  return `${encodePrettyJsonText(manifest)}\n`;
});

/** Installed package fields exercised by the isolated consumer verifier. */
const InstalledManifestSchema = Schema.Struct({
  exports: Schema.Record(
    Schema.String,
    Schema.Record(Schema.String, Schema.String)
  ),
  name: Schema.String,
});

type InstalledManifest = typeof InstalledManifestSchema.Type;

/** Decodes every entry of one object whose values must be text. */
function textEntries(
  value: Readonly<Record<string, unknown>>,
  message: (key: string) => string
): Effect.Effect<Readonly<Record<string, string>>, ManifestError> {
  return Effect.forEach(Rec.toEntries(value), ([key, entry]) =>
    textField(entry, message(key)).pipe(
      Effect.map((text) => [key, text] as const)
    )
  ).pipe(Effect.map(Rec.fromEntries));
}

/** Decodes string-valued export conditions from an installed manifest. */
const exportConditions = Effect.fn("AksaraContracts.exportConditions")(
  function* (value: unknown, subpath: string) {
    const conditions = yield* objectField(
      value,
      `Export ${subpath} must be an object`
    );
    return yield* textEntries(
      conditions,
      (condition) => `Export ${subpath} condition ${condition} must be text`
    );
  }
);

/** Decodes one optional dependency map from a package manifest. */
const dependencyMap = Effect.fn("AksaraContracts.dependencyMap")(function* (
  manifest: Readonly<Record<string, unknown>>,
  section: DependencySection
) {
  const value = manifest[section];
  if (value === undefined) {
    return;
  }
  const dependencies = yield* objectField(
    value,
    `${section} must be an object`
  );
  return yield* textEntries(
    dependencies,
    (name) => `${name} must use a text version`
  );
});

/** Decodes package fields exercised by the tarball verifier. */
export const parsePackageManifest = Effect.fn(
  "AksaraContracts.parsePackageManifest"
)(function* (source: string) {
  const parsed = yield* manifestObject(
    source,
    "The package manifest must be an object"
  );
  const [name, description, homepage, license] = yield* Effect.all([
    textField(parsed.name, "Package name must be text"),
    textField(parsed.description, "Package description must be text"),
    textField(parsed.homepage, "Package homepage must be text"),
    textField(parsed.license, "Package license must be text"),
  ]);
  const engines = yield* objectField(
    parsed.engines,
    "Package engines must be an object"
  );
  const node = yield* textField(
    engines.node,
    "Package Node engine must be text"
  );
  const [exports, imports, repository] = yield* Effect.all([
    objectField(parsed.exports, "Package exports must be an object"),
    objectField(parsed.imports, "Package imports must be an object"),
    objectField(parsed.repository, "Package repository must be an object"),
  ]);
  const [type, url, directory] = yield* Effect.all([
    textField(repository.type, "Package repository type must be text"),
    textField(repository.url, "Package repository URL must be text"),
    textField(
      repository.directory,
      "Package repository directory must be text"
    ),
  ]);
  const [
    dependencies,
    devDependencies,
    optionalDependencies,
    peerDependencies,
  ] = yield* Effect.forEach(DEPENDENCY_SECTIONS, (section) =>
    dependencyMap(parsed, section)
  );
  return {
    dependencies,
    description,
    devDependencies,
    engines: { node },
    exports,
    homepage,
    imports,
    license,
    name,
    optionalDependencies,
    peerDependencies,
    repository: { directory, type, url },
  } satisfies PackageManifest;
});

/** Decodes the installed package fields exercised by module resolution. */
export const parseInstalledManifest = Effect.fn(
  "AksaraContracts.parseInstalledManifest"
)(function* (source: string) {
  const parsed = yield* manifestObject(
    source,
    "The installed manifest must be an object"
  );
  const name = yield* textField(parsed.name, "The package name must be text");
  const rawExports = yield* objectField(
    parsed.exports,
    "The package must declare exports"
  );
  const exports: Record<string, Readonly<Record<string, string>>> = {};
  for (const [subpath, descriptor] of Rec.toEntries(rawExports)) {
    exports[subpath] = yield* exportConditions(descriptor, subpath);
  }
  return { exports, name } satisfies InstalledManifest;
});
