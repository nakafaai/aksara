import assert from "node:assert/strict";
import { isRecord } from "effect/Predicate";

export const DEPENDENCY_SECTIONS = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
] as const;

type DependencySection = (typeof DEPENDENCY_SECTIONS)[number];

/** Package fields required by isolated tarball verification. */
export interface PackageManifest {
  readonly dependencies: Readonly<Record<string, string>> | undefined;
  readonly devDependencies: Readonly<Record<string, string>> | undefined;
  readonly engines: { readonly node: string };
  readonly exports: Readonly<Record<string, unknown>>;
  readonly imports: Readonly<Record<string, unknown>>;
  readonly license: string;
  readonly name: string;
  readonly optionalDependencies: Readonly<Record<string, string>> | undefined;
  readonly peerDependencies: Readonly<Record<string, string>> | undefined;
}

/** Root toolchain field inherited by an isolated package consumer. */
interface WorkspaceManifest {
  readonly packageManager: string;
}

/** Installed package fields exercised by the isolated consumer verifier. */
interface InstalledManifest {
  readonly exports: Readonly<Record<string, Readonly<Record<string, string>>>>;
  readonly name: string;
}

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
  assert.ok(isRecord(value), `Export ${subpath} must be an object`);
  const conditions: Record<string, string> = {};
  for (const [condition, target] of Object.entries(value)) {
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
  assert.ok(isRecord(value), `${section} must be an object`);
  const dependencies: Record<string, string> = {};
  for (const [name, version] of Object.entries(value)) {
    dependencies[name] = textField(version, `${name} must use a text version`);
  }
  return dependencies;
}

/** Decodes package fields exercised by the tarball verifier. */
export function parsePackageManifest(source: string): PackageManifest {
  const parsed: unknown = JSON.parse(source);
  assert.ok(isRecord(parsed), "The package manifest must be an object");
  const name = textField(parsed.name, "Package name must be text");
  const license = textField(parsed.license, "Package license must be text");
  const { engines, exports: packageExports, imports: packageImports } = parsed;
  assert.ok(isRecord(engines), "Package engines must be an object");
  const node = textField(engines.node, "Package Node engine must be text");
  assert.ok(isRecord(packageExports), "Package exports must be an object");
  assert.ok(isRecord(packageImports), "Package imports must be an object");

  return {
    dependencies: dependencyMap(parsed, "dependencies"),
    devDependencies: dependencyMap(parsed, "devDependencies"),
    engines: { node },
    exports: packageExports,
    imports: packageImports,
    license,
    name,
    optionalDependencies: dependencyMap(parsed, "optionalDependencies"),
    peerDependencies: dependencyMap(parsed, "peerDependencies"),
  };
}

/** Decodes the installed package fields exercised by module resolution. */
export function parseInstalledManifest(source: string): InstalledManifest {
  const parsed: unknown = JSON.parse(source);
  assert.ok(isRecord(parsed), "The installed manifest must be an object");
  const name = textField(parsed.name, "The package name must be text");
  const rawExports = parsed.exports;
  assert.ok(isRecord(rawExports), "The package must declare exports");
  const exports: Record<string, Readonly<Record<string, string>>> = {};
  for (const [subpath, descriptor] of Object.entries(rawExports)) {
    exports[subpath] = exportConditions(descriptor, subpath);
  }
  return { exports, name };
}

/** Decodes the root package-manager contract used by the consumer. */
export function parseWorkspaceManifest(source: string): WorkspaceManifest {
  const parsed: unknown = JSON.parse(source);
  assert.ok(isRecord(parsed), "The workspace manifest must be an object");
  const packageManager = textField(
    parsed.packageManager,
    "Workspace packageManager must be text"
  );
  return { packageManager };
}
