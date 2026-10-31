import {
  Array as Arr,
  Config,
  Effect,
  FileSystem,
  Option,
  Path,
  Record as Rec,
  Schema,
} from "effect";
import type { BumpDependenciesConfig } from "#scripts/dependencies/bump";
import type { BunRunner, CommandOutput } from "#scripts/dependencies/command";
import { DEPENDENCY_HOLDS } from "#scripts/dependencies/policy";

const JsonText = Schema.fromJsonString(Schema.Unknown);

/** Creates one exact command observation. */
export function output(exitCode = 0, stdout = "", stderr = ""): CommandOutput {
  return { exitCode, stderr, stdout };
}

/** The reviewed upstream release of every hold, keyed by package name. */
export const reviewedHoldReleases: Readonly<Record<string, readonly string[]>> =
  Rec.fromEntries(
    Arr.map(
      DEPENDENCY_HOLDS,
      (hold) => [hold.dependency, [hold.reviewedLatest]] as const
    )
  );

/** The releases that Bun lists for every routine declaration in the approved manifest. */
export const reviewedReleases: Readonly<Record<string, readonly string[]>> = {
  esbuild: ["0.28.2"],
  "source-map-js": ["1.2.2"],
  yaml: ["2.9.1"],
};

/** Creates the output of `bun info <name> versions --json` for one list of releases. */
export function releaseVersions(versions: readonly string[]): CommandOutput {
  return output(0, Schema.encodeSync(JsonText)(versions));
}

/** The Bun answer for every reviewed hold and every routine package: its releases, keyed by package name. */
const REVIEWED_ANSWERS: Readonly<Record<string, CommandOutput>> = {
  ...Rec.map(reviewedHoldReleases, releaseVersions),
  ...Rec.map(reviewedReleases, releaseVersions),
};

/** Builds deterministic Bun output for one policy test, answering each package name. */
export function makeRunner(
  registry: Readonly<Record<string, CommandOutput>> = {},
  update: CommandOutput = output()
): BunRunner {
  const answers = { ...REVIEWED_ANSWERS, ...registry };
  return (_root, args) => {
    if (args[0] === "update") {
      return Effect.succeed(update);
    }
    const spec = Option.getOrThrow(Arr.get(args, 1));
    return Effect.succeed(Option.getOrThrow(Rec.get(answers, spec)));
  };
}

/** Returns the approved declaration for one held dependency. */
export function approved(dependency: string): string {
  return Option.getOrThrow(
    Arr.findFirst(DEPENDENCY_HOLDS, (entry) => entry.dependency === dependency)
  ).approvedCurrent;
}

/** A root manifest that declares every reviewed hold at its approved version, plus routine dependencies. */
export function approvedManifest(options?: {
  readonly catalog?: Readonly<Record<string, string>>;
  readonly omit?: string;
  readonly overrides?: Readonly<Record<string, string>>;
}) {
  const catalog: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};
  const overrides: Record<string, string> = { "source-map-js": "1.2.2" };
  for (const hold of DEPENDENCY_HOLDS) {
    if (hold.source === "catalog") {
      catalog[hold.dependency] = hold.approvedCurrent;
    }
    if (hold.source === "override") {
      overrides[hold.dependency] = hold.approvedCurrent;
    }
    if (hold.source === "root-dev-dependency") {
      devDependencies[hold.dependency] = hold.approvedCurrent;
    }
  }
  const omitted = options?.omit;
  const declared = Rec.filter(
    { ...devDependencies, "@probe/app": "workspace:*", yaml: "2.9.1" },
    (_, name) => name !== omitted
  );
  return {
    devDependencies: declared,
    devEngines: {
      runtime: { name: "node", onFail: "download", version: approved("node") },
    },
    overrides: { ...overrides, ...options?.overrides },
    packageManager: `bun@${approved("bun")}`,
    workspaces: {
      catalog: { ...catalog, esbuild: "0.28.2", ...options?.catalog },
      packages: ["apps/*", "packages/*"],
    },
  };
}

/** Writes one root manifest, or the exact text given, into a fresh temporary workspace. */
export const createConfig = Effect.fn("DependencyFixture.createConfig")(
  function* (input?: { readonly manifest?: unknown; readonly text?: string }) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-bump-deps-",
    });
    const manifest = path.join(root, "package.json");
    const text =
      input?.text ??
      (yield* Schema.encodeEffect(JsonText)(
        input?.manifest ?? approvedManifest()
      ));
    yield* fileSystem.writeFileString(manifest, text);
    return { manifest, root } satisfies BumpDependenciesConfig;
  }
);

/**
 * Installs a local bun executable that answers registry lookups from one table
 * and accepts updates. Returns the PATH that makes it the first `bun` found.
 */
export const installFakeBun = Effect.fn("DependencyFixture.installFakeBun")(
  function* (root: string, registry: Readonly<Record<string, unknown>>) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const executable = path.join(root, "bun");
    const registryText = yield* Schema.encodeEffect(JsonText)(registry);
    yield* fileSystem.writeFileString(
      executable,
      `#!/usr/bin/env node
const args = process.argv.slice(2);
const registry = ${registryText};
if (args[0] === "info") {
  console.log(JSON.stringify(registry[args[1]] ?? "missing"));
  process.exit(0);
}
process.exit(args[0] === "update" ? 0 : 2);
`
    );
    yield* fileSystem.chmod(executable, 0o755);
    const originalPath = yield* Config.String("PATH").pipe(
      Config.withDefault("")
    );
    return `${root}:${originalPath}`;
  }
);
