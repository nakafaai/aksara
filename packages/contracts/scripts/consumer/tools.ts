import assert from "node:assert/strict";
import { Array as Arr, Schema } from "effect";
import { encodeJsonText, encodePrettyJsonText } from "#scripts/text/json";

const ConsumerManifestInputSchema = Schema.Struct({
  effectVersion: Schema.String,
  packageManager: Schema.String,
  packageName: Schema.String,
  tarballPath: Schema.String,
});

type ConsumerManifestInput = typeof ConsumerManifestInputSchema.Type;

/** Executables used to build and inspect the isolated package. */
const ConsumerToolsSchema = Schema.Struct({
  pnpm: Schema.String,
  tar: Schema.String,
});

/** Executables used to build and inspect the isolated package. */
export type ConsumerTools = typeof ConsumerToolsSchema.Type;

/** Host inputs required to stage one isolated consumer package. */
export const ConsumerPackageInputSchema = Schema.Struct({
  platform: Schema.Literals([
    "aix",
    "android",
    "cygwin",
    "darwin",
    "freebsd",
    "haiku",
    "linux",
    "netbsd",
    "openbsd",
    "sunos",
    "win32",
  ]),
  temporaryDirectory: Schema.optionalKey(Schema.String),
  tools: Schema.optionalKey(
    Schema.Struct({
      pnpm: Schema.optionalKey(Schema.String),
      tar: Schema.optionalKey(Schema.String),
    })
  ),
});

/** Host inputs required to stage one isolated consumer package. */
export type ConsumerPackageInput = typeof ConsumerPackageInputSchema.Type;

/** One expected isolated-consumer verification failure. */
export class ConsumerVerificationError extends Schema.TaggedError<ConsumerVerificationError>()(
  "ConsumerVerificationError",
  {
    cause: Schema.Unknown,
    detail: Schema.String,
    reason: Schema.Literals(["argument", "filesystem", "manifest", "process"]),
  }
) {}

/** Creates one stable consumer verification failure. */
export function consumerError(
  reason: typeof ConsumerVerificationError.fields.reason.Type,
  detail: string,
  cause: unknown
) {
  return new ConsumerVerificationError({ cause, detail, reason });
}

/** Preserves one upstream cause inside a stable consumer failure. */
export function consumerFailure(
  reason: typeof ConsumerVerificationError.fields.reason.Type,
  detail: string
) {
  return (cause: unknown) =>
    consumerError(reason, `${detail}: ${String(cause)}`, cause);
}

/** Requires package tooling to produce exactly one tarball archive. */
export function selectPackedArchive(paths: readonly string[]): string {
  const archives = Arr.filter(paths, (path) => path.endsWith(".tgz"));
  assert.equal(archives.length, 1, "pnpm must produce exactly one tarball");
  const [archive] = archives;
  assert.ok(archive, "The packed archive must be present");
  return archive;
}

/** Serializes the isolated package consumer without inheriting workspace state. */
export function createConsumerManifest({
  effectVersion,
  packageManager,
  packageName,
  tarballPath,
}: ConsumerManifestInput) {
  return `${encodePrettyJsonText({
    dependencies: {
      [packageName]: `file:${tarballPath}`,
      effect: effectVersion,
    },
    imports: {
      "#scripts/*": "./verify/*.ts",
    },
    name: "aksara-contracts-external-consumer",
    packageManager,
    private: true,
    type: "module",
  })}\n`;
}

/** Serializes type proofs for every export and the Effect-native renderer seam. */
export function createConsumerSource(
  packageName: string,
  publicSpecifiers: readonly string[]
) {
  const typeImports = Arr.map(
    publicSpecifiers,
    (specifier, index) =>
      `import type * as Contract${index} from ${encodeJsonText(specifier)};`
  );
  const typeReferences = Arr.map(
    publicSpecifiers,
    (_specifier, index) => `typeof Contract${index}`
  );

  return `${Arr.join(typeImports, "\n")}
import { createRendererManifest } from "${packageName}/renderer/manifest";
import type { RendererManifestHashComputeError } from "${packageName}/renderer/contract";
import type { RendererDomain } from "${packageName}/renderer/domain";

type EffectError<Value> = Value extends import("effect").Effect.Effect<
  unknown,
  infer Error,
  unknown
>
  ? Error
  : never;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type Expect<Value extends true> = Value;
type ManifestEffect = ReturnType<typeof createRendererManifest>;
type ManifestError = EffectError<ManifestEffect>;

export type RendererDomainRejectsUnknown = Expect<
  "unknown" extends RendererDomain ? false : true
>;
export type RendererManifestReturnsEffect = Expect<
  ManifestEffect extends import("effect").Effect.Effect<unknown, unknown, unknown>
    ? true
    : false
>;
export type RendererManifestErrorIsTyped = Expect<
  IsAny<ManifestError> extends false ? true : false
>;
export type RendererManifestErrorIsPresent = Expect<
  IsNever<ManifestError> extends false ? true : false
>;
export type RendererManifestErrorRejectsUnknown = Expect<
  unknown extends ManifestError ? false : true
>;
export type RendererManifestErrorIncludesHashFailure = Expect<
  RendererManifestHashComputeError extends ManifestError ? true : false
>;

export type InstalledContractSurface = [${Arr.join(typeReferences, ", ")}];
`;
}

/** Serializes the strict NodeNext compiler boundary for the isolated consumer. */
export function createConsumerTsconfig() {
  return `${encodePrettyJsonText({
    compilerOptions: {
      lib: ["ES2022", "DOM", "ESNext.Disposable"],
      module: "NodeNext",
      moduleResolution: "NodeNext",
      noEmit: true,
      skipLibCheck: false,
      strict: true,
      target: "ES2022",
    },
    files: ["consumer.ts"],
  })}\n`;
}

/** Serializes the external Node runtime verifier for the installed tarball. */
export function createInstallRunner() {
  return `import { Effect } from "effect";
import {
  InstallVerificationError,
  verifyInstalledPackage,
} from "#scripts/verify/install";
import { textField } from "#scripts/manifest";

const packageName = textField(
  process.argv[2],
  "The installed package name is required"
);

const installError = (message: string) => (cause: unknown) =>
  new InstallVerificationError({ cause, message });

await Effect.runPromise(
  verifyInstalledPackage({
    consumerRoot: process.cwd(),
    importModule: (specifier) =>
      Effect.tryPromise({
        catch: installError(\`Unable to import \${specifier}.\`),
        try: () => import(specifier),
      }),
    packageName,
    resolveSpecifier: (specifier) =>
      Effect.try({
        catch: installError(\`Unable to resolve \${specifier}.\`),
        try: () => import.meta.resolve(specifier),
      }),
    write: (message) =>
      Effect.sync(() => {
        process.stdout.write(message);
      }),
  })
);
`;
}
