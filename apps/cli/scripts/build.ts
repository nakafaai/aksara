import { layer as fileSystemLayer } from "@effect/platform-node/NodeFileSystem";
import { layer as pathLayer } from "@effect/platform-node/NodePath";
import { runMain } from "@effect/platform-node/NodeRuntime";
import { Effect, FileSystem, Layer, Path, Record as Rec, Schema } from "effect";
import { build } from "esbuild";
import { generateBundledNotice } from "#scripts/notice";

const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;
/** Two-space indented JSON text, the bytes JSON.stringify(value, null, 2) writes. */
const PrettyJsonTextSchema = Schema.fromJsonString(Schema.Unknown, {
  space: 2,
});
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
class CliBuildError extends Schema.TaggedError<
  CliBuildError,
  { readonly brand: unique symbol }
>()("CliBuildError", {
  cause: Schema.Unknown,
  stage: Schema.Literals(["bundle", "manifest", "notice", "permissions"]),
}) {}

/** The files the build reads and writes, resolved from the package root. */
const buildPaths = Effect.fn("AksaraCliBuild.paths")(function* () {
  const path = yield* Path.Path;
  const packageRoot = path.resolve(import.meta.dirname, "..");
  const outputDirectory = path.join(packageRoot, "dist");
  const distributionRoot = path.join(outputDirectory, "package");
  return {
    distributionRoot,
    entryPoint: path.join(packageRoot, "src", "launcher.ts"),
    licensePath: path.join(packageRoot, "LICENSE"),
    manifestPath: path.join(packageRoot, "package.json"),
    outputDirectory,
    outputFile: path.join(distributionRoot, "dist", "main.js"),
    outputLicense: path.join(distributionRoot, "LICENSE"),
    outputManifest: path.join(distributionRoot, "package.json"),
    outputNotice: path.join(distributionRoot, "NOTICE"),
    outputReadme: path.join(distributionRoot, "README.md"),
    packageRoot,
    readmePath: path.join(packageRoot, "README.md"),
  };
});

/** Maps one build-boundary failure without leaking arbitrary diagnostics. */
const buildError = (stage: CliBuildError["stage"]) => (cause: unknown) =>
  new CliBuildError({ cause, stage });

/** Reads the exact source metadata used to stage the public package. */
const readManifest = Effect.fn("AksaraCliBuild.readManifest")(function* (
  manifestPath: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem
    .readFileString(manifestPath)
    .pipe(Effect.mapError(buildError("manifest")));
  return yield* Schema.decodeEffect(ManifestSchema)(source).pipe(
    Effect.mapError(buildError("manifest"))
  );
});

/** Produces one checkout-bound Node launcher for npm consumers. */
const buildCli = Effect.fn("AksaraCliBuild.build")(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const {
    distributionRoot,
    entryPoint,
    licensePath,
    manifestPath,
    outputDirectory,
    outputFile,
    outputLicense,
    outputManifest,
    outputNotice,
    outputReadme,
    packageRoot,
    readmePath,
  } = yield* buildPaths();
  const manifest = yield* readManifest(manifestPath);
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
    Rec.keys(result.metafile.inputs),
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
  const releaseManifestText = yield* Schema.encodeEffect(PrettyJsonTextSchema)(
    releaseManifest
  ).pipe(Effect.orDie);
  yield* Effect.all(
    [
      fileSystem.chmod(outputFile, 0o755),
      fileSystem.copyFile(licensePath, outputLicense),
      fileSystem.copyFile(readmePath, outputReadme),
      fileSystem.writeFileString(outputNotice, notice),
      fileSystem.writeFileString(outputManifest, `${releaseManifestText}\n`),
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
