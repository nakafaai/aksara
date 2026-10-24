import {
  Array as Arr,
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

const RegistryVersionText = Schema.fromJsonString(Schema.String);
const JsonText = Schema.fromJsonString(Schema.Unknown);

/** Creates one exact command observation. */
export function output(exitCode = 0, stdout = "", stderr = ""): CommandOutput {
  return { exitCode, stderr, stdout };
}

/** The Bun answer for every reviewed hold, which names its reviewed upstream version. */
const REVIEWED_ANSWERS = Rec.fromEntries(
  DEPENDENCY_HOLDS.map(
    (hold) =>
      [
        hold.registry,
        output(0, Schema.encodeSync(RegistryVersionText)(hold.reviewedLatest)),
      ] as const
  )
);

/** Builds deterministic Bun output for one policy test, answering each registry spec. */
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

/** The registry answer for every reviewed hold, which is its reviewed upstream version. */
export const reviewedRegistry = Rec.fromEntries(
  DEPENDENCY_HOLDS.map((hold) => [hold.registry, hold.reviewedLatest] as const)
);

/** Returns the approved declaration for one held dependency. */
export function approved(dependency: string): string {
  return Option.getOrThrow(
    Arr.findFirst(DEPENDENCY_HOLDS, (entry) => entry.dependency === dependency)
  ).approvedCurrent;
}

/** A root manifest that declares every reviewed hold at its approved version, plus routine dependencies. */
export function approvedManifest(overrides?: {
  readonly catalog?: Readonly<Record<string, string>>;
  readonly omit?: string;
}) {
  const catalog: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};
  for (const hold of DEPENDENCY_HOLDS) {
    if (hold.source === "catalog") {
      catalog[hold.dependency] = hold.approvedCurrent;
    }
    if (hold.source === "root-dev-dependency") {
      devDependencies[hold.dependency] = hold.approvedCurrent;
    }
  }
  const omitted = overrides?.omit;
  const declared = Rec.filter(
    { ...devDependencies, "@probe/app": "workspace:*", yaml: "2.9.1" },
    (_, name) => name !== omitted
  );
  return {
    devDependencies: declared,
    devEngines: {
      runtime: { name: "node", onFail: "download", version: approved("node") },
    },
    packageManager: `bun@${approved("bun")}`,
    workspaces: {
      catalog: { ...catalog, esbuild: "0.28.2", ...overrides?.catalog },
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
