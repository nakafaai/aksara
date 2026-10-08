import assert from "node:assert/strict";
import {
  Array as Arr,
  Effect,
  Option,
  Path,
  Record as Rec,
  Schema,
} from "effect";
import { parseDocument } from "yaml";
import { trackedFiles } from "#scripts/check/files";
import { readSource } from "#scripts/workflow/source";

export const TEST_TASK_PREFIX = "test:";
const TEST_SCRIPT = "test";
const MANIFEST_FILE = "package.json";
const WORKSPACE_FILE = "pnpm-workspace.yaml";
const DIRECTORY_GLOB_PATTERN = /^[A-Za-z][\w.-]*(?:\/[A-Za-z][\w.-]*)*\/\*$/u;
const DIRECTORY_GLOB_SUFFIX = "/*";

const ManifestSchema = Schema.Struct({
  name: Schema.String,
  scripts: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});

const WorkspaceSchema = Schema.Struct({
  packages: Schema.Array(Schema.String),
});

/** Lists the test targets that one package manifest declares. */
export function manifestTestTargets(
  path: string,
  source: string
): readonly string[] {
  const manifest = Schema.decodeOption(Schema.fromJsonString(ManifestSchema))(
    source
  );
  assert.ok(Option.isSome(manifest), `${path} must be a package manifest`);
  const scripts = manifest.value.scripts ?? {};
  if (path === MANIFEST_FILE) {
    return Arr.filter(Rec.keys(scripts), (script) =>
      script.startsWith(TEST_TASK_PREFIX)
    );
  }
  return Object.hasOwn(scripts, TEST_SCRIPT) ? [manifest.value.name] : [];
}

/** Lists the directories that the pnpm workspace globs name as `<directory>/*`. */
function workspaceDirectories(workspace: string): readonly string[] {
  const document = parseDocument(workspace);
  assert.equal(
    document.errors.length,
    0,
    "pnpm-workspace.yaml must be valid YAML"
  );
  const decoded = Schema.decodeUnknownOption(WorkspaceSchema)(document.toJS());
  assert.ok(
    Option.isSome(decoded),
    "pnpm-workspace.yaml must declare its packages"
  );
  return Arr.map(decoded.value.packages, (glob) => {
    assert.match(
      glob,
      DIRECTORY_GLOB_PATTERN,
      `Workspace glob ${glob} must be a plain directory followed by /*, such as apps/*`
    );
    return glob.slice(0, -DIRECTORY_GLOB_SUFFIX.length);
  });
}

/** Reports whether one tracked path is the manifest of a workspace that a glob names. */
function isWorkspaceManifest(
  path: Path.Path,
  file: string,
  directories: readonly string[]
): boolean {
  if (path.basename(file) !== MANIFEST_FILE) {
    return false;
  }
  return directories.includes(path.dirname(path.dirname(file)));
}

/** Lists the root manifest and every workspace manifest that the pnpm workspace names. */
export const manifestPaths = Effect.fn("WorkflowTarget.manifestPaths")(
  function* (workspace: string, trackedPaths: readonly string[]) {
    const path = yield* Path.Path;
    const directories = workspaceDirectories(workspace);
    return Arr.filter(
      trackedPaths,
      (file) =>
        file === MANIFEST_FILE || isWorkspaceManifest(path, file, directories)
    );
  }
);

/** Lists every test target the repository owns, read from its tracked manifests. */
export const repositoryTestTargets = Effect.fn(
  "WorkflowTarget.repositoryTestTargets"
)(function* () {
  const workspace = yield* readSource(WORKSPACE_FILE);
  const manifests = yield* manifestPaths(workspace, trackedFiles());
  const targets = yield* Effect.forEach(manifests, (path) =>
    readSource(path).pipe(
      Effect.map((source) => manifestTestTargets(path, source))
    )
  );
  return Arr.flatten(targets);
});
