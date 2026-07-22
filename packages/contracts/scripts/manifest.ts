import assert from "node:assert/strict";

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
  readonly license: string;
  readonly name: string;
  readonly optionalDependencies: Readonly<Record<string, string>> | undefined;
  readonly peerDependencies: Readonly<Record<string, string>> | undefined;
}

/** Root toolchain field inherited by an isolated package consumer. */
export interface WorkspaceManifest {
  readonly packageManager: string;
}

/** Narrows parsed JSON objects without introducing an unsafe cast. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Requires one unknown manifest field to be text. */
function textField(value: unknown, message: string): string {
  if (typeof value !== "string") {
    assert.fail(message);
  }
  return value;
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
  const { engines, exports: packageExports } = parsed;
  assert.ok(isRecord(engines), "Package engines must be an object");
  const node = textField(engines.node, "Package Node engine must be text");
  assert.ok(isRecord(packageExports), "Package exports must be an object");

  return {
    dependencies: dependencyMap(parsed, "dependencies"),
    devDependencies: dependencyMap(parsed, "devDependencies"),
    engines: { node },
    exports: packageExports,
    license,
    name,
    optionalDependencies: dependencyMap(parsed, "optionalDependencies"),
    peerDependencies: dependencyMap(parsed, "peerDependencies"),
  };
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
