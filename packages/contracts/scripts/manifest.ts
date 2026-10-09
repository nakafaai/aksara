import assert from "node:assert/strict";
import { Array as Arr, Record as Rec, Schema } from "effect";
import { isObject } from "effect/Predicate";
import { encodePrettyJsonText, JsonTextSchema } from "#scripts/text/json";

export const DEPENDENCY_SECTIONS = [
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

/** Verifies the public identity and provenance metadata of the contracts package. */
export function assertContractPackageMetadata(manifest: PackageManifest): void {
  assert.ok(
    manifest.description.trim().length > 0,
    "The contract package description must not be empty"
  );
  assert.equal(
    manifest.homepage,
    "https://github.com/nakafaai/aksara#readme",
    "The contract package must link to the reviewed Aksara homepage"
  );
  assert.deepEqual(
    manifest.repository,
    {
      directory: "packages/contracts",
      type: "git",
      url: "git+https://github.com/nakafaai/aksara.git",
    },
    "The contract package must identify its exact source repository directory"
  );
}

/** Rejects workspace-only dependency protocols in a portable release archive. */
export function assertPortableDependencies(manifest: PackageManifest): void {
  for (const section of DEPENDENCY_SECTIONS) {
    for (const version of Rec.values(manifest[section] ?? {})) {
      assert.doesNotMatch(
        version,
        WORKSPACE_PROTOCOL_PATTERN,
        `Released ${section} must use portable versions`
      );
    }
  }
}

/** Removes repository-only source resolution from one released export map. */
function releasedExports(value: unknown): Readonly<Record<string, unknown>> {
  assert.ok(isObject(value), "Package exports must be an object");
  return Rec.fromEntries(
    Arr.map(
      Rec.toEntries(value),
      ([subpath, descriptor]): readonly [
        string,
        Readonly<Record<string, unknown>>,
      ] => {
        assert.ok(isObject(descriptor), `Export ${subpath} must be an object`);
        return [
          subpath,
          Rec.fromEntries(
            Arr.filter(
              Rec.toEntries(descriptor),
              ([condition]) => condition !== SOURCE_CONDITION
            )
          ),
        ];
      }
    )
  );
}

/** Serializes the remote archive manifest without workspace source targets. */
export function createReleaseManifest(
  source: string,
  effectVersion: string
): string {
  const parsed: unknown = Schema.decodeSync(JsonTextSchema)(source);
  assert.ok(isObject(parsed), "The package manifest must be an object");
  assert.ok(isObject(parsed.peerDependencies), "peerDependencies must exist");
  const {
    devDependencies: _devDependencies,
    exports: packageExports,
    imports: _packageImports,
    scripts: _scripts,
    ...released
  } = parsed;
  const manifest = {
    ...released,
    exports: releasedExports(packageExports),
    imports: {
      "#contracts/*": {
        default: "./dist/*.js",
        types: "./dist/*.d.ts",
      },
    },
    peerDependencies: {
      ...parsed.peerDependencies,
      effect: effectVersion,
    },
  };
  return `${encodePrettyJsonText(manifest)}\n`;
}

/** Root toolchain field inherited by an isolated package consumer. */
const WorkspaceManifestSchema = Schema.Struct({
  packageManager: Schema.String,
});

type WorkspaceManifest = typeof WorkspaceManifestSchema.Type;

/** Installed package fields exercised by the isolated consumer verifier. */
const InstalledManifestSchema = Schema.Struct({
  exports: Schema.Record(
    Schema.String,
    Schema.Record(Schema.String, Schema.String)
  ),
  name: Schema.String,
});

type InstalledManifest = typeof InstalledManifestSchema.Type;

/** Requires one unknown manifest field to be text. */
export function textField(value: unknown, message: string): string {
  if (typeof value !== "string") {
    assert.fail(message);
  }
  return value;
}

/** Decodes string-valued export conditions from an installed manifest. */
function exportConditions(
  value: unknown,
  subpath: string
): Readonly<Record<string, string>> {
  assert.ok(isObject(value), `Export ${subpath} must be an object`);
  const conditions: Record<string, string> = {};
  for (const [condition, target] of Rec.toEntries(value)) {
    conditions[condition] = textField(
      target,
      `Export ${subpath} condition ${condition} must be text`
    );
  }
  return conditions;
}

/** Decodes one optional dependency map from a package manifest. */
function dependencyMap(
  manifest: Record<string, unknown>,
  section: DependencySection
): Readonly<Record<string, string>> | undefined {
  const value = manifest[section];
  if (value === undefined) {
    return;
  }
  assert.ok(isObject(value), `${section} must be an object`);
  const dependencies: Record<string, string> = {};
  for (const [name, version] of Rec.toEntries(value)) {
    dependencies[name] = textField(version, `${name} must use a text version`);
  }
  return dependencies;
}

/** Decodes package fields exercised by the tarball verifier. */
export function parsePackageManifest(source: string): PackageManifest {
  const parsed: unknown = Schema.decodeSync(JsonTextSchema)(source);
  assert.ok(isObject(parsed), "The package manifest must be an object");
  const name = textField(parsed.name, "Package name must be text");
  const description = textField(
    parsed.description,
    "Package description must be text"
  );
  const homepage = textField(parsed.homepage, "Package homepage must be text");
  const license = textField(parsed.license, "Package license must be text");
  const {
    engines,
    exports: packageExports,
    imports: packageImports,
    repository,
  } = parsed;
  assert.ok(isObject(engines), "Package engines must be an object");
  const node = textField(engines.node, "Package Node engine must be text");
  assert.ok(isObject(packageExports), "Package exports must be an object");
  assert.ok(isObject(packageImports), "Package imports must be an object");
  assert.ok(isObject(repository), "Package repository must be an object");
  const repositoryType = textField(
    repository.type,
    "Package repository type must be text"
  );
  const repositoryUrl = textField(
    repository.url,
    "Package repository URL must be text"
  );
  const repositoryDirectory = textField(
    repository.directory,
    "Package repository directory must be text"
  );

  return {
    dependencies: dependencyMap(parsed, "dependencies"),
    description,
    devDependencies: dependencyMap(parsed, "devDependencies"),
    engines: { node },
    exports: packageExports,
    homepage,
    imports: packageImports,
    license,
    name,
    optionalDependencies: dependencyMap(parsed, "optionalDependencies"),
    peerDependencies: dependencyMap(parsed, "peerDependencies"),
    repository: {
      directory: repositoryDirectory,
      type: repositoryType,
      url: repositoryUrl,
    },
  };
}

/** Decodes the installed package fields exercised by module resolution. */
export function parseInstalledManifest(source: string): InstalledManifest {
  const parsed: unknown = Schema.decodeSync(JsonTextSchema)(source);
  assert.ok(isObject(parsed), "The installed manifest must be an object");
  const name = textField(parsed.name, "The package name must be text");
  const rawExports = parsed.exports;
  assert.ok(isObject(rawExports), "The package must declare exports");
  const exports: Record<string, Readonly<Record<string, string>>> = {};
  for (const [subpath, descriptor] of Rec.toEntries(rawExports)) {
    exports[subpath] = exportConditions(descriptor, subpath);
  }
  return { exports, name };
}

/** Decodes the root package-manager contract used by the consumer. */
export function parseWorkspaceManifest(source: string): WorkspaceManifest {
  const parsed: unknown = Schema.decodeSync(JsonTextSchema)(source);
  assert.ok(isObject(parsed), "The workspace manifest must be an object");
  const packageManager = textField(
    parsed.packageManager,
    "Workspace packageManager must be text"
  );
  return { packageManager };
}
