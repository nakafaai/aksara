import assert from "node:assert/strict";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const NODE_IMPORT_CONDITIONS = new Set(["node", "import", "default"]);

interface InstalledManifest {
  readonly exports: Readonly<Record<string, Readonly<Record<string, string>>>>;
  readonly name: string;
}

/** Narrows parsed JSON objects without introducing an unsafe cast. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Requires one unknown installed-manifest field to be text. */
function textField(value: unknown, message: string): string {
  if (typeof value !== "string") {
    assert.fail(message);
  }
  return value;
}

/** Decodes string-valued export conditions without assertions or casts. */
function parseConditions(
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

/** Decodes the installed package fields exercised by this verifier. */
function parseManifest(source: string): InstalledManifest {
  const parsed: unknown = JSON.parse(source);
  assert.ok(isRecord(parsed), "The installed manifest must be an object");
  const name = textField(parsed.name, "The package name must be text");
  const rawExports = parsed.exports;
  assert.ok(isRecord(rawExports), "The package must declare exports");
  const exports: Record<string, Readonly<Record<string, string>>> = {};
  for (const [subpath, descriptor] of Object.entries(rawExports)) {
    exports[subpath] = parseConditions(descriptor, subpath);
  }
  return { exports, name };
}

const packageName = textField(
  process.argv[2],
  "The installed package name is required"
);

const nodeModulesRoot = realpathSync(join(process.cwd(), "node_modules"));
const packageRoot = realpathSync(
  join(nodeModulesRoot, ...packageName.split("/"))
);
const installedRelativePath = relative(nodeModulesRoot, packageRoot);

assert.ok(
  installedRelativePath.length > 0 &&
    !installedRelativePath.startsWith(`..${sep}`) &&
    !isAbsolute(installedRelativePath),
  `${packageName} must resolve inside the isolated consumer's node_modules`
);

const manifest = parseManifest(
  readFileSync(join(packageRoot, "package.json"), "utf8")
);

assert.equal(manifest.name, packageName, "The packed package name changed");

let importedConditionCount = 0;
const moduleImports: Promise<unknown>[] = [];

for (const [subpath, descriptor] of Object.entries(manifest.exports)) {
  assert.ok(
    subpath === "." || (subpath.startsWith("./") && !subpath.includes("*")),
    `Only exact package exports are supported: ${subpath}`
  );
  const conditionEntries = Object.entries(descriptor);
  const typesTarget = conditionEntries.find(
    ([condition]) => condition === "types"
  );
  const importTargets = conditionEntries.filter(([condition]) =>
    NODE_IMPORT_CONDITIONS.has(condition)
  );

  assert.ok(typesTarget, `Export ${subpath} must declare a types condition`);
  assert.ok(
    importTargets.length > 0,
    `Export ${subpath} must declare a Node-importable condition`
  );

  for (const [condition, target] of conditionEntries) {
    assert.equal(
      typeof target,
      "string",
      `Export ${subpath} condition ${condition} must have a string target`
    );
    assert.ok(
      target.startsWith("./dist/"),
      `Export ${subpath} condition ${condition} must target dist`
    );
    assert.ok(
      existsSync(join(packageRoot, target)),
      `Export ${subpath} condition ${condition} is missing ${target}`
    );
  }

  for (const [, target] of importTargets) {
    moduleImports.push(import(pathToFileURL(join(packageRoot, target)).href));
    importedConditionCount += 1;
  }

  const publicSpecifier =
    subpath === "." ? packageName : `${packageName}/${subpath.slice(2)}`;
  const expectedTarget = importTargets[0]?.[1];
  assert.ok(expectedTarget, `Export ${subpath} must resolve in Node`);
  const resolvedTarget = fileURLToPath(import.meta.resolve(publicSpecifier));

  assert.equal(
    realpathSync(resolvedTarget),
    realpathSync(join(packageRoot, expectedTarget)),
    `Node selected the wrong condition for ${publicSpecifier}`
  );
  moduleImports.push(import(publicSpecifier));
}

await Promise.all(moduleImports);

process.stdout.write(
  `Verified ${Object.keys(manifest.exports).length} exact exports and ${importedConditionCount} Node-importable conditions from the installed tarball.\n`
);
