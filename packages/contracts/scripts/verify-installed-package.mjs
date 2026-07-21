import assert from "node:assert/strict";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const NODE_IMPORT_CONDITIONS = new Set(["node", "import", "default"]);
const [, , packageName] = process.argv;

assert.ok(packageName, "The installed package name is required");

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

const manifest = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf8")
);

assert.equal(manifest.name, packageName, "The packed package name changed");

assert.ok(
  manifest.exports && typeof manifest.exports === "object",
  "The installed package must declare exact exports"
);

let importedConditionCount = 0;
const moduleImports = [];

for (const [subpath, descriptor] of Object.entries(manifest.exports)) {
  assert.ok(
    subpath === "." || (subpath.startsWith("./") && !subpath.includes("*")),
    `Only exact package exports are supported: ${subpath}`
  );
  assert.ok(
    descriptor && typeof descriptor === "object" && !Array.isArray(descriptor),
    `Export ${subpath} must use an explicit condition map`
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
  const resolvedTarget = fileURLToPath(import.meta.resolve(publicSpecifier));

  assert.equal(
    realpathSync(resolvedTarget),
    realpathSync(join(packageRoot, expectedTarget)),
    `Node selected the wrong condition for ${publicSpecifier}`
  );
  moduleImports.push(import(publicSpecifier));
}

await Promise.all(moduleImports);

console.log(
  `Verified ${Object.keys(manifest.exports).length} exact exports and ${importedConditionCount} Node-importable conditions from the installed tarball.`
);
