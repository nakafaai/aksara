import {
  Array as Arr,
  HashMap,
  HashSet,
  MutableHashMap,
  Option,
  Predicate,
  Record as Rec,
  Schema,
} from "effect";

const JsonText = Schema.fromJsonString(Schema.Unknown);
const WORKSPACE_SOURCE_PATTERN = /^(apps|packages)\/([^/]+)\//u;
const IMPORT_WILDCARD_PATTERN = /\*$/u;

const WorkspaceIdentitySchema = Schema.Struct({
  allowedDependencies: Schema.HashSet(Schema.String),
  developmentDependencies: Schema.HashSet(Schema.String),
  privatePrefixes: Schema.Array(Schema.String),
  publicName: Schema.String,
  runtimeDependencies: Schema.HashSet(Schema.String),
});
type WorkspaceIdentity = typeof WorkspaceIdentitySchema.Type;

/** Returns the import-boundary identity of the workspace that owns one source file. */
export type WorkspaceIdentityResolver = (
  file: string
) => WorkspaceIdentity | undefined;

const allowedWorkspaceDependencies: HashMap.HashMap<
  string,
  HashSet.HashSet<string>
> = HashMap.fromIterable([
  [
    "cli",
    HashSet.fromIterable([
      "@nakafa/aksara-compiler",
      "@nakafa/aksara-contracts",
      "@nakafa/aksara-corpus",
      "@nakafa/aksara-publisher",
      "@nakafa/aksara-utilities",
    ]),
  ],
  ["compiler", HashSet.fromIterable(["@nakafa/aksara-contracts"])],
  ["contracts", HashSet.empty<string>()],
  [
    "corpus",
    HashSet.fromIterable([
      "@nakafa/aksara-contracts",
      "@nakafa/aksara-utilities",
    ]),
  ],
  [
    "publisher",
    HashSet.fromIterable([
      "@nakafa/aksara-compiler",
      "@nakafa/aksara-contracts",
      "@nakafa/aksara-corpus",
      "@nakafa/aksara-utilities",
    ]),
  ],
  ["testing", HashSet.empty<string>()],
  ["utilities", HashSet.empty<string>()],
]);

/** Returns declared package names from one manifest dependency section. */
function dependencyNames(input: unknown): readonly string[] {
  return Predicate.isObject(input) ? Rec.keys(input) : [];
}

/** Creates one cached workspace identity resolver from package manifests. */
export function createWorkspaceIdentityResolver(
  readManifest: (path: string) => string
): WorkspaceIdentityResolver {
  const identities = MutableHashMap.empty<string, WorkspaceIdentity>();
  return (file) => {
    const match: RegExpExecArray | null = WORKSPACE_SOURCE_PATTERN.exec(file);
    const workspaceRoot = match?.[1];
    const workspace = match?.[2];
    if (!workspace || workspace === "typescript-config") {
      return;
    }
    const cached = MutableHashMap.get(identities, workspace);
    if (Option.isSome(cached)) {
      return cached.value;
    }
    const manifest: unknown = Schema.decodeSync(JsonText)(
      readManifest(`${workspaceRoot}/${workspace}/package.json`)
    );
    if (!Predicate.isObject(manifest) || typeof manifest.name !== "string") {
      throw new Error(
        `${workspaceRoot}/${workspace}/package.json has no package name`
      );
    }
    const allowedDependencies = HashMap.get(
      allowedWorkspaceDependencies,
      workspace
    );
    if (Option.isNone(allowedDependencies)) {
      throw new Error(
        `${workspaceRoot}/${workspace} has no import-boundary policy`
      );
    }
    const imports = Predicate.isObject(manifest.imports)
      ? Rec.keys(manifest.imports)
      : [];
    const identity = {
      allowedDependencies: allowedDependencies.value,
      developmentDependencies: HashSet.fromIterable(
        dependencyNames(manifest.devDependencies)
      ),
      privatePrefixes: Arr.map(
        Arr.filter(imports, (specifier) => specifier.startsWith("#")),
        (specifier) => specifier.replace(IMPORT_WILDCARD_PATTERN, "")
      ),
      publicName: manifest.name,
      runtimeDependencies: HashSet.fromIterable(
        dependencyNames(manifest.dependencies)
      ),
    } satisfies WorkspaceIdentity;
    MutableHashMap.set(identities, workspace, identity);
    return identity;
  };
}
