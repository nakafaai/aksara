import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { ContractDecodeError } from "#contracts/errors.js";
import { Sha256HashSchema } from "#contracts/ids.js";
import {
  canonicalizeRendererManifestContract,
  RENDERER_CONTRACT_VERSION,
  RendererAuthoringComponentDuplicateError,
  RendererAuthoringComponentExtraError,
  RendererAuthoringComponentMissingError,
  RendererAuthoringComponentUnsupportedError,
  RendererAuthoringSelectionNonCanonicalError,
  type RendererComponentRequirement,
  RendererComponentRequirementSchema,
  RendererManifestAuthoringComponentsSchema,
  type RendererManifestEnvelope,
  RendererManifestEnvelopeSchema,
  RendererManifestHashComputeError,
  RendererManifestHashMismatchError,
  RendererManifestSupportedComponentsSchema,
  sortRendererComponentRequirements,
} from "#contracts/renderer/contract.js";

const RendererManifestCreationSchema = Schema.Struct({
  authoringComponents: Schema.Array(RendererComponentRequirementSchema),
  supportedComponents: Schema.Array(RendererComponentRequirementSchema),
});

const RendererManifestWireSchema = Schema.Struct({
  authoringComponents: Schema.Array(RendererComponentRequirementSchema),
  format: Schema.Literal("nakafa-mdx-renderer-v1"),
  hash: Sha256HashSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
  supportedComponents: Schema.Array(RendererComponentRequirementSchema),
});

/** Strictly decodes one renderer contract and maps failures to its boundary. */
function decodeContract<A, I>(
  schema: Schema.Schema<A, I>,
  contract: string,
  input: unknown
) {
  return Schema.decodeUnknown(schema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new ContractDecodeError({
          cause,
          contract,
          message: String(cause),
        })
    )
  );
}

/** Hashes the canonical supported and authoring renderer contract. */
const hashRendererContract = Effect.fn("AksaraContracts.hashRendererContract")(
  (
    supportedComponents: readonly RendererComponentRequirement[],
    authoringComponents: readonly RendererComponentRequirement[]
  ) =>
    Effect.try({
      catch: (cause) => new RendererManifestHashComputeError({ cause }),
      try: () =>
        Sha256HashSchema.make(
          `sha256:${createHash("sha256")
            .update(
              canonicalizeRendererManifestContract(
                supportedComponents,
                authoringComponents
              )
            )
            .digest("hex")}`
        ),
    })
);

/** Validates canonical authoring pins against supported renderer versions. */
function validateCanonicalAuthoringSelection(
  supportedComponents: readonly RendererComponentRequirement[],
  authoringComponents: readonly RendererComponentRequirement[]
) {
  return Effect.gen(function* () {
    const selectedNames =
      yield* validateUniqueAuthoringNames(authoringComponents);
    yield* validateCanonicalAuthoringOrder(authoringComponents);
    yield* validateSupportedAuthoringSelections(
      supportedComponents,
      authoringComponents
    );
    yield* validateCompleteAuthoringNames(supportedComponents, selectedNames);

    return yield* decodeContract(
      RendererManifestAuthoringComponentsSchema,
      "RendererManifestAuthoringComponents",
      authoringComponents
    );
  });
}

/** Rejects duplicate component names in the authoring selection. */
const validateUniqueAuthoringNames = Effect.fn(
  "AksaraContracts.validateUniqueAuthoringNames"
)((authoringComponents: readonly RendererComponentRequirement[]) => {
  const selectedNames = new Set<string>();
  for (const selection of authoringComponents) {
    if (selectedNames.has(selection.name)) {
      return Effect.fail(
        new RendererAuthoringComponentDuplicateError({
          componentName: selection.name,
        })
      );
    }
    selectedNames.add(selection.name);
  }
  return Effect.succeed(selectedNames);
});

/** Rejects authoring selections that are not already canonically ordered. */
const validateCanonicalAuthoringOrder = Effect.fn(
  "AksaraContracts.validateCanonicalAuthoringOrder"
)((authoringComponents: readonly RendererComponentRequirement[]) => {
  const sorted = sortRendererComponentRequirements(authoringComponents);
  for (const [index, selection] of authoringComponents.entries()) {
    const canonical = sorted[index];
    if (
      canonical?.name !== selection.name ||
      canonical.version !== selection.version
    ) {
      return Effect.fail(
        new RendererAuthoringSelectionNonCanonicalError({
          componentName: selection.name,
          index,
        })
      );
    }
  }
  return Effect.void;
});

/** Rejects authoring pins that the runtime cannot render. */
const validateSupportedAuthoringSelections = Effect.fn(
  "AksaraContracts.validateSupportedAuthoringSelections"
)(
  (
    supportedComponents: readonly RendererComponentRequirement[],
    authoringComponents: readonly RendererComponentRequirement[]
  ) => {
    for (const selection of authoringComponents) {
      const supportedVersions = supportedComponents.filter(
        ({ name }) => name === selection.name
      );
      if (supportedVersions.length === 0) {
        return Effect.fail(
          new RendererAuthoringComponentExtraError({
            componentName: selection.name,
          })
        );
      }
      if (
        !supportedVersions.some(({ version }) => version === selection.version)
      ) {
        return Effect.fail(
          new RendererAuthoringComponentUnsupportedError({
            componentName: selection.name,
            version: selection.version,
          })
        );
      }
    }
    return Effect.void;
  }
);

/** Requires an authoring version for every supported component name. */
const validateCompleteAuthoringNames = Effect.fn(
  "AksaraContracts.validateCompleteAuthoringNames"
)(
  (
    supportedComponents: readonly RendererComponentRequirement[],
    selectedNames: ReadonlySet<string>
  ) => {
    for (const supported of supportedComponents) {
      if (!selectedNames.has(supported.name)) {
        return Effect.fail(
          new RendererAuthoringComponentMissingError({
            componentName: supported.name,
          })
        );
      }
    }
    return Effect.void;
  }
);

/** Strictly decodes the canonical set of runtime component capabilities. */
function decodeSupportedComponents(input: unknown) {
  return decodeContract(
    RendererManifestSupportedComponentsSchema,
    "RendererManifestSupportedComponents",
    input
  );
}

/** Creates a canonical renderer envelope from support and pinned authoring. */
export const createRendererManifest = Effect.fn(
  "AksaraContracts.createRendererManifest"
)((input: unknown) =>
  decodeContract(
    RendererManifestCreationSchema,
    "RendererManifestCreation",
    input
  ).pipe(
    Effect.flatMap((creation) => {
      const sortedSupported = sortRendererComponentRequirements(
        creation.supportedComponents
      );
      return Effect.all({
        authoringComponents: validateCanonicalAuthoringSelection(
          sortedSupported,
          creation.authoringComponents
        ),
        supportedComponents: decodeSupportedComponents(sortedSupported),
      });
    }),
    Effect.flatMap(({ authoringComponents, supportedComponents }) =>
      hashRendererContract(supportedComponents, authoringComponents).pipe(
        Effect.map((hash) =>
          RendererManifestEnvelopeSchema.make({
            authoringComponents,
            format: "nakafa-mdx-renderer-v1",
            hash,
            rendererContractVersion: RENDERER_CONTRACT_VERSION,
            supportedComponents,
          })
        )
      )
    )
  )
);

/** Strictly decodes and verifies a renderer envelope and authoring selection. */
export const validateRendererManifestHash = Effect.fn(
  "AksaraContracts.validateRendererManifestHash"
)((input: unknown) =>
  decodeContract(
    RendererManifestWireSchema,
    "RendererManifestEnvelope",
    input
  ).pipe(
    Effect.flatMap((manifest) =>
      Effect.all({
        authoringComponents: validateCanonicalAuthoringSelection(
          manifest.supportedComponents,
          manifest.authoringComponents
        ),
        supportedComponents: decodeSupportedComponents(
          manifest.supportedComponents
        ),
      }).pipe(
        Effect.flatMap(({ authoringComponents, supportedComponents }) =>
          hashRendererContract(supportedComponents, authoringComponents).pipe(
            Effect.flatMap((actualHash) => {
              if (actualHash !== manifest.hash) {
                return Effect.fail(
                  new RendererManifestHashMismatchError({
                    actualHash,
                    expectedHash: manifest.hash,
                  })
                );
              }
              return Effect.succeed<RendererManifestEnvelope>(
                RendererManifestEnvelopeSchema.make({
                  ...manifest,
                  authoringComponents,
                  supportedComponents,
                })
              );
            })
          )
        )
      )
    )
  )
);
