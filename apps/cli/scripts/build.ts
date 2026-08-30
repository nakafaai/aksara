import { fileURLToPath } from "node:url";
import { layer as fileSystemLayer } from "@effect/platform-node/NodeFileSystem";
import { layer as pathLayer } from "@effect/platform-node/NodePath";
import { runMain } from "@effect/platform-node/NodeRuntime";
import { Effect, FileSystem, Layer, Schema } from "effect";
import { build } from "esbuild";
import { generateBundledNotice } from "#scripts/notice";

const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;
const ManifestSchema = Schema.fromJsonString(
  Schema.Struct({
    bin: Schema.Struct({ aksara: Schema.Literal("dist/main.js") }),
    bugs: Schema.Struct({ url: Schema.String }),
    description: Schema.Trimmed.pipe(Schema.check(Schema.isNonEmpty())),
    engines: Schema.Struct({ node: Schema.String }),
    files: Schema.Tuple([
      Schema.Literal("dist"),
      Schema.Literal("LICENSE"),
      Schema.Literal("NOTICE"),
      Schema.Literal("README.md"),
    ]),
    homepage: Schema.String,
    keywords: Schema.Array(Schema.String),
    license: Schema.Literal("SEE LICENSE IN LICENSE"),
    name: Schema.Literal("@nakafa/aksara-cli"),
    private: Schema.Literal(true),
    publishConfig: Schema.Struct({
      access: Schema.Literal("public"),
      provenance: Schema.Literal(true),
    }),
    repository: Schema.Struct({
      directory: Schema.Literal("apps/cli"),
      type: Schema.Literal("git"),
      url: Schema.String,
    }),
    type: Schema.Literal("module"),
    version: Schema.String.pipe(
      Schema.check(Schema.isPattern(VERSION_PATTERN))
    ),
  })
);

/** A package manifest, bundle, or output permission blocked CLI packaging. */
class CliBuildError extends Schema.TaggedError<CliBuildError>()(
  "CliBuildError",
  {
    cause: Schema.Unknown,
    stage: Schema.Literals(["bundle", "manifest", "notice", "permissions"]),
  }
) {}

const packageRoot = fileURLToPath(new URL("../", import.meta.url));
const manifestPath = fileURLToPath(new URL("../package.json", import.meta.url));
const licensePath = fileURLToPath(new URL("../LICENSE", import.meta.url));
const readmePath = fileURLToPath(new URL("../README.md", import.meta.url));
const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const distributionRoot = fileURLToPath(
  new URL("../dist/package/", import.meta.url)
);
const outputFile = fileURLToPath(
  new URL("../dist/package/dist/main.js", import.meta.url)
);
const outputLicense = fileURLToPath(
  new URL("../dist/package/LICENSE", import.meta.url)
);
const outputManifest = fileURLToPath(
  new URL("../dist/package/package.json", import.meta.url)
);
const outputNotice = fileURLToPath(
  new URL("../dist/package/NOTICE", import.meta.url)
);
const outputReadme = fileURLToPath(
  new URL("../dist/package/README.md", import.meta.url)
);
const entryPoint = fileURLToPath(
  new URL("../src/launcher.ts", import.meta.url)
);

/** Maps one build-boundary failure without leaking arbitrary diagnostics. */
const buildError = (stage: CliBuildError["stage"]) => (cause: unknown) =>
  new CliBuildError({ cause, stage });

/** Reads the exact source metadata used to stage the public package. */
const readManifest = Effect.fn("AksaraCliBuild.readManifest")(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem
    .readFileString(manifestPath)
    .pipe(Effect.mapError(buildError("manifest")));
  return yield* Schema.decodeEffect(ManifestSchema)(source).pipe(
    Effect.mapError(buildError("manifest"))
  );
});

/** Produces one checkout-bound Node 24 launcher for npm consumers. */
const buildCli = Effect.fn("AksaraCliBuild.build")(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const manifest = yield* readManifest();
  yield* fileSystem
    .remove(outputDirectory, { force: true, recursive: true })
    .pipe(Effect.mapError(buildError("permissions")));
  yield* fileSystem
    .makeDirectory(distributionRoot, { recursive: true })
    .pipe(Effect.mapError(buildError("permissions")));
  const result = yield* Effect.tryPromise({
    catch: buildError("bundle"),
    try: () =>
      build({
        banner: {
          js: '#!/usr/bin/env node\nimport { createRequire as __aksaraCreateRequire } from "node:module";\nimport { dirname as __aksaraDirname } from "node:path";\nimport { fileURLToPath as __aksaraFileURLToPath } from "node:url";\nconst require = __aksaraCreateRequire(import.meta.url);\nconst __filename = __aksaraFileURLToPath(import.meta.url);\nconst __dirname = __aksaraDirname(__filename);',
        },
        bundle: true,
        conditions: ["aksara-source"],
        entryPoints: [entryPoint],
        format: "esm",
        legalComments: "eof",
        metafile: true,
        outfile: outputFile,
        packages: "bundle",
        platform: "node",
        target: "node24",
        treeShaking: true,
      }),
  });
  const notice = yield* generateBundledNotice(
    Object.keys(result.metafile.inputs),
    packageRoot
  ).pipe(Effect.mapError(buildError("notice")));
  const releaseManifest = {
    bin: manifest.bin,
    bugs: manifest.bugs,
    description: manifest.description,
    engines: manifest.engines,
    files: manifest.files,
    homepage: manifest.homepage,
    keywords: manifest.keywords,
    license: manifest.license,
    name: manifest.name,
    publishConfig: manifest.publishConfig,
    repository: manifest.repository,
    type: manifest.type,
    version: manifest.version,
  };
  yield* Effect.all(
    [
      fileSystem.chmod(outputFile, 0o755),
      fileSystem.copyFile(licensePath, outputLicense),
      fileSystem.copyFile(readmePath, outputReadme),
      fileSystem.writeFileString(outputNotice, notice),
      fileSystem.writeFileString(
        outputManifest,
        `${JSON.stringify(releaseManifest, null, 2)}\n`
      ),
    ],
    { concurrency: 4 }
  ).pipe(Effect.mapError(buildError("permissions")));
  yield* Effect.logInfo("Aksara CLI package built.").pipe(
    Effect.annotateLogs({
      output: outputFile,
      packageRoot,
      version: manifest.version,
    })
  );
});

runMain(
  buildCli().pipe(Effect.provide(Layer.mergeAll(fileSystemLayer, pathLayer)))
);
