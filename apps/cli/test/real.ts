import { NodeServices } from "@effect/platform-node";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { RENDERER_DOMAINS } from "@nakafa/aksara-contracts/renderer/domain";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { Effect, FileSystem, MutableHashSet, Path, Schema } from "effect";
import { selectPreviewDocument } from "#cli/repository";

/** Runs one module-load program that needs the Node file system and path services. */
function runWithNodeServices<A, E>(
  effect: Effect.Effect<A, E, FileSystem.FileSystem | Path.Path>
) {
  return Effect.runPromise(effect.pipe(Effect.provide(NodeServices.layer)));
}

export const REPOSITORY_ROOT = await runWithNodeServices(
  Effect.gen(function* () {
    const path = yield* Path.Path;
    return path.resolve(import.meta.dirname, "..", "..", "..");
  })
);
export const MATERIAL_ENTRIES = await Effect.runPromise(
  decodeMaterialRegistry()
);
const functionContentKey =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
export const FUNCTION_SCOPE = PublicationScopeSchema.make({
  families: ["material"],
  snapshots: [],
});
const englishEntry = MATERIAL_ENTRIES.find(
  ({ route }) =>
    route.contentKey === functionContentKey && route.appLocale === "en"
);
if (!englishEntry) {
  throw new Error(
    "The real English material registry row is required by tests."
  );
}
export const ENGLISH_ENTRY = englishEntry;
const indonesianEntry = MATERIAL_ENTRIES.find(
  ({ route }) =>
    route.contentKey === functionContentKey && route.appLocale === "id"
);
if (!indonesianEntry) {
  throw new Error(
    "The real Indonesian material registry row is required by tests."
  );
}
export const REAL_SOURCE = await runWithNodeServices(
  Effect.gen(function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    return yield* fileSystem.readFileString(
      path.resolve(REPOSITORY_ROOT, ENGLISH_ENTRY.sourcePath)
    );
  })
);
const selectedDocument = await Effect.runPromise(
  selectPreviewDocument(REPOSITORY_ROOT, ENGLISH_ENTRY.sourcePath).pipe(
    Effect.provide(NodeServices.layer)
  )
);
const selectedPaths = MutableHashSet.fromIterable([
  ...selectedDocument.files.map(({ sourcePath }) => sourcePath),
  indonesianEntry.sourcePath,
]);
export const RENDERER_MANIFEST = await Effect.runPromise(
  createRendererManifest({
    base: ["BlockMath", "Highlight", "InlineMath", "MathContainer"],
    domains: RENDERER_DOMAINS.map((name) => {
      if (name === "chemistry") {
        const component = "AtomShellLab";
        return { components: [component], name };
      }
      if (name === "mathematics") {
        const component = "FunctionMachine";
        return { components: [component], name };
      }
      return { components: [], name };
    }),
    publishedDomains: ["mathematics"],
  })
);

const TestRepositoriesSchema = Schema.Struct({
  aksaraRoot: Schema.String,
  documentPath: Schema.String,
  nakafaRoot: Schema.String,
  root: Schema.String,
});

/** Isolated real-corpus checkout pair used by filesystem integration tests. */
export type TestRepositories = typeof TestRepositoriesSchema.Type;

/** Copies only final registered source files into isolated repository shells. */
const makeTestRepositories = Effect.fn("AksaraCliTest.makeTestRepositories")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = yield* fileSystem.makeTempDirectory({
      prefix: "aksara-cli-",
    });
    const aksaraRoot = path.resolve(root, "aksara");
    const nakafaRoot = path.resolve(root, "nakafa.com");
    yield* fileSystem.writeFileString(
      path.resolve(root, ".guard"),
      "aksara-cli-test"
    );
    yield* fileSystem.makeDirectory(aksaraRoot, { recursive: true });
    yield* fileSystem.makeDirectory(path.resolve(nakafaRoot, "apps", "www"), {
      recursive: true,
    });
    yield* fileSystem.writeFileString(
      path.resolve(aksaraRoot, "package.json"),
      '{"name":"aksara"}\n'
    );
    yield* fileSystem.writeFileString(
      path.resolve(nakafaRoot, "package.json"),
      '{"name":"nakafa"}\n'
    );
    yield* fileSystem.writeFileString(
      path.resolve(nakafaRoot, "apps", "www", "package.json"),
      '{"name":"www"}\n'
    );
    for (const sourcePath of selectedPaths) {
      const target = path.resolve(aksaraRoot, sourcePath);
      yield* fileSystem.makeDirectory(path.dirname(target), {
        recursive: true,
      });
      yield* fileSystem.copyFile(
        path.resolve(REPOSITORY_ROOT, sourcePath),
        target
      );
    }
    return {
      aksaraRoot,
      documentPath: path.resolve(aksaraRoot, ENGLISH_ENTRY.sourcePath),
      nakafaRoot,
      root,
    } satisfies TestRepositories;
  }
);

/** Removes only a helper-owned temporary root carrying its exact guard file. */
const removeTestRepositories = Effect.fn(
  "AksaraCliTest.removeTestRepositories"
)(function* (repositories: TestRepositories) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const guard = path.resolve(repositories.root, ".guard");
  if ((yield* fileSystem.readFileString(guard)) !== "aksara-cli-test") {
    return yield* Effect.die(
      new Error("Refusing to remove an unrecognized test repository root.")
    );
  }
  yield* fileSystem.remove(repositories.root, {
    force: true,
    recursive: true,
  });
});

/** Tracks isolated repository pairs and removes every surviving pair on demand. */
export function makeRepositoryTracker() {
  const repositories: TestRepositories[] = [];

  /** Creates and retains one isolated repository pair for later cleanup. */
  const create = Effect.fn("AksaraCliTest.createRepositories")(function* () {
    const repository = yield* makeTestRepositories();
    repositories.push(repository);
    return repository;
  });

  /** Removes every tracked repository pair that still exists. */
  const removeAll = Effect.fn("AksaraCliTest.clearRepositories")(function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    for (const repository of repositories.splice(0)) {
      if (yield* fileSystem.exists(repository.root)) {
        yield* removeTestRepositories(repository);
      }
    }
  });

  /** Runs the cleanup from a test hook or release callback, the test boundary. */
  function clear() {
    return Effect.runPromise(
      removeAll().pipe(Effect.provide(NodeServices.layer))
    );
  }

  return { clear, create };
}
