import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import { Sha256HashSchema } from "#contracts/ids";
import { RendererComponentRequirementSchema } from "#contracts/renderer/component";
import {
  canonicalizeRendererManifestContract,
  RENDERER_CONTRACT_VERSION,
  RENDERER_MANIFEST_FORMAT,
  type RendererDomainCapability,
  type RendererManifestEnvelope,
  RendererManifestEnvelopeSchema,
  RendererManifestHashComputeError,
  RendererManifestHashMismatchError,
  RendererPublishedDomainsSchema,
} from "#contracts/renderer/contract";
import {
  type RendererDomain,
  RendererDomainSchema,
} from "#contracts/renderer/domain";
import { normalizeRendererSelection } from "#contracts/renderer/selection";
import { compareCodeUnits } from "#contracts/text/order";

const CapabilityCreationFields = {
  authoringComponents: Schema.Array(RendererComponentRequirementSchema),
  supportedComponents: Schema.Array(RendererComponentRequirementSchema),
};
const RendererManifestCreationSchema = Schema.Struct({
  base: Schema.Struct(CapabilityCreationFields),
  domains: Schema.Array(
    Schema.Struct({ name: RendererDomainSchema, ...CapabilityCreationFields })
  ),
  publishedDomains: Schema.Array(RendererDomainSchema),
});
const RendererManifestWireSchema = Schema.Struct({
  ...RendererManifestCreationSchema.fields,
  format: Schema.Literal(RENDERER_MANIFEST_FORMAT),
  hash: Sha256HashSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
});

/** Sorts and decodes the exact route domains exposed by the deployed app. */
const normalizePublishedDomains = Effect.fn(
  "AksaraContracts.normalizePublishedDomains"
)((domains: readonly RendererDomain[]) =>
  decodeContract(
    RendererPublishedDomainsSchema,
    "RendererPublishedDomains",
    [...domains].sort(compareCodeUnits)
  )
);

/** Hashes the canonical base and domain-scoped renderer contract. */
const hashRendererContract = Effect.fn("AksaraContracts.hashRendererContract")(
  (input: {
    readonly base: RendererManifestEnvelope["base"];
    readonly domains: readonly RendererDomainCapability[];
    readonly publishedDomains: RendererManifestEnvelope["publishedDomains"];
  }) =>
    Effect.try({
      catch: (cause) => new RendererManifestHashComputeError({ cause }),
      try: () =>
        Sha256HashSchema.make(
          `sha256:${createHash("sha256")
            .update(canonicalizeRendererManifestContract(input))
            .digest("hex")}`
        ),
    })
);

/** Creates a canonical renderer envelope from real registry capabilities. */
export const createRendererManifest = Effect.fn(
  "AksaraContracts.createRendererManifest"
)((input: unknown) =>
  decodeContract(
    RendererManifestCreationSchema,
    "RendererManifestCreation",
    input
  ).pipe(
    Effect.flatMap((wire) =>
      Effect.all({
        contract: normalizeRendererSelection(wire),
        publishedDomains: normalizePublishedDomains(wire.publishedDomains),
      })
    ),
    Effect.flatMap(({ contract, publishedDomains }) =>
      hashRendererContract({ ...contract, publishedDomains }).pipe(
        Effect.flatMap((hash) =>
          decodeContract(
            RendererManifestEnvelopeSchema,
            "RendererManifestEnvelope",
            {
              ...contract,
              format: RENDERER_MANIFEST_FORMAT,
              hash,
              publishedDomains,
              rendererContractVersion: RENDERER_CONTRACT_VERSION,
            }
          )
        )
      )
    )
  )
);

/** Strictly decodes and verifies a domain-scoped renderer envelope. */
export const validateRendererManifestHash = Effect.fn(
  "AksaraContracts.validateRendererManifestHash"
)((input: unknown) =>
  decodeContract(
    RendererManifestWireSchema,
    "RendererManifestEnvelope",
    input
  ).pipe(
    Effect.flatMap((wire) =>
      Effect.all({
        contract: normalizeRendererSelection(wire),
        publishedDomains: normalizePublishedDomains(wire.publishedDomains),
      }).pipe(
        Effect.flatMap(({ contract, publishedDomains }) =>
          hashRendererContract({ ...contract, publishedDomains }).pipe(
            Effect.filterOrFail(
              (actualHash) => actualHash === wire.hash,
              (actualHash) =>
                new RendererManifestHashMismatchError({
                  actualHash,
                  expectedHash: wire.hash,
                })
            ),
            Effect.flatMap(() =>
              decodeContract(
                RendererManifestEnvelopeSchema,
                "RendererManifestEnvelope",
                { ...wire, ...contract, publishedDomains }
              )
            )
          )
        )
      )
    )
  )
);
