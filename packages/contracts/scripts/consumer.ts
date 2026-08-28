import assert from "node:assert/strict";
import { Effect, Schema } from "effect";
import { ChildProcess } from "effect/unstable/process";

const CONFIG_ENVIRONMENT_PATTERN = /^(?:NPM|PNPM)_CONFIG_/iu;
const CREDENTIAL_ENVIRONMENT_PATTERN = /^(?:NODE_AUTH_TOKEN|NPM_TOKEN)$/iu;

interface ConsumerManifestInput {
  readonly effectVersion: string;
  readonly packageManager: string;
  readonly packageName: string;
  readonly tarballPath: string;
}

/** Executables used to build and inspect the isolated package. */
export interface ConsumerTools {
  readonly pnpm: string;
  readonly tar: string;
}

/** Host inputs required to stage one isolated consumer package. */
export interface ConsumerPackageInput {
  readonly environment: NodeJS.ProcessEnv;
  readonly platform: NodeJS.Platform;
  readonly temporaryDirectory?: string;
  readonly tools?: Partial<ConsumerTools>;
}

/** Removes registry credentials and pins empty package-manager configuration. */
export function createCredentialFreeEnvironment(
  environment: NodeJS.ProcessEnv,
  globalConfig: string,
  userConfig: string
): NodeJS.ProcessEnv {
  return {
    ...Object.fromEntries(
      Object.entries(environment).filter(
        ([name]) =>
          !(
            CREDENTIAL_ENVIRONMENT_PATTERN.test(name) ||
            CONFIG_ENVIRONMENT_PATTERN.test(name)
          )
      )
    ),
    NPM_CONFIG_GLOBALCONFIG: globalConfig,
    NPM_CONFIG_USERCONFIG: userConfig,
  };
}

/** Resolves the platform-specific executable name without invoking a shell. */
export function executablePath(executable: string, platform: NodeJS.Platform) {
  return platform === "win32" ? `${executable}.cmd` : executable;
}

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

/** Executes one child command without a shell and verifies its exact exit code. */
export const runConsumerCommand = Effect.fn(
  "AksaraContracts.runConsumerCommand"
)(
  (
    executable: string,
    args: readonly string[],
    environment: NodeJS.ProcessEnv,
    platform: NodeJS.Platform,
    stage: string,
    cwd?: string
  ) =>
    Effect.gen(function* () {
      const exitCode = yield* ChildProcess.make(
        executablePath(executable, platform),
        args,
        {
          cwd,
          env: environment,
          extendEnv: false,
          stderr: "inherit",
          stdin: "inherit",
          stdout: "inherit",
        }
      ).pipe(
        Effect.flatMap((child) => child.exitCode),
        Effect.mapError(consumerFailure("process", `${stage} command failed`)),
        Effect.scoped
      );
      if (exitCode !== 0) {
        return yield* consumerError(
          "process",
          `${stage} exited unsuccessfully with code ${exitCode}`,
          { exitCode }
        );
      }
    })
);

/** Requires package tooling to produce exactly one tarball archive. */
export function selectPackedArchive(paths: readonly string[]): string {
  const archives = paths.filter((path) => path.endsWith(".tgz"));
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
  return `${JSON.stringify(
    {
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
    },
    null,
    2
  )}\n`;
}

/** Serializes type proofs for every export and the Effect-native renderer seam. */
export function createConsumerSource(
  packageName: string,
  publicSpecifiers: readonly string[]
) {
  const typeImports = publicSpecifiers.map(
    (specifier, index) =>
      `import type * as Contract${index} from ${JSON.stringify(specifier)};`
  );
  const typeReferences = publicSpecifiers.map(
    (_specifier, index) => `typeof Contract${index}`
  );

  return `${typeImports.join("\n")}
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

export type InstalledContractSurface = [${typeReferences.join(", ")}];
`;
}

/** Serializes the strict NodeNext compiler boundary for the isolated consumer. */
export function createConsumerTsconfig() {
  return `${JSON.stringify(
    {
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
    },
    null,
    2
  )}\n`;
}

/** Serializes the external Node runtime verifier for the installed tarball. */
export function createInstallRunner() {
  return `import { Effect } from "effect";
import {
  InstallVerificationError,
  verifyInstalledPackage,
} from "#scripts/verify-install";
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
