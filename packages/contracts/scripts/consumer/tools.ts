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

/**
 * Serializes the plain Node script that the verifier runs inside the isolated
 * consumer. It reads one JSON request from standard input, resolves each public
 * specifier with import.meta.resolve, imports each specifier or file URL, and
 * writes the resolved URLs as one JSON document to standard output. It imports
 * nothing from the repository, so only the consumer's own packages are used.
 */
export function createInstallRunner() {
  return `const chunks = [];
for await (const chunk of process.stdin) {
  chunks.push(chunk);
}
const request = JSON.parse(Buffer.concat(chunks).toString("utf8"));

function resolveSpecifier(specifier) {
  try {
    return import.meta.resolve(specifier);
  } catch (cause) {
    throw new Error("Unable to resolve " + specifier + ": " + String(cause));
  }
}

async function importSpecifier(specifier) {
  try {
    await import(specifier);
  } catch (cause) {
    throw new Error("Unable to import " + specifier + ": " + String(cause));
  }
}

try {
  const resolved = {};
  for (const specifier of request.resolutions) {
    resolved[specifier] = resolveSpecifier(specifier);
  }
  for (const specifier of request.imports) {
    await importSpecifier(specifier);
  }
  process.stdout.write(JSON.stringify({ resolved }) + "\\n");
} catch (error) {
  process.stderr.write(error.message + "\\n");
  process.exitCode = 1;
}
`;
}
