interface ConsumerManifestInput {
  readonly effectVersion: string;
  readonly packageManager: string;
  readonly packageName: string;
  readonly tarballPath: string;
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
