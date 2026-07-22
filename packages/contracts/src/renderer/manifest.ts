import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { ContractDecodeError } from "#contracts/errors";
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
} from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";
import { normalizeRendererSelection } from "#contracts/renderer/selection";

const CapabilityCreationFields = {
  authoringComponents: Schema.Array(RendererComponentRequirementSchema),
  supportedComponents: Schema.Array(RendererComponentRequirementSchema),
};
const RendererManifestCreationSchema = Schema.Struct({
  base: Schema.Struct(CapabilityCreationFields),
  domains: Schema.Array(
    Schema.Struct({ name: RendererDomainSchema, ...CapabilityCreationFields })
  ),
});
const RendererManifestWireSchema = Schema.Struct({
  ...RendererManifestCreationSchema.fields,
  format: Schema.Literal(RENDERER_MANIFEST_FORMAT),
  hash: Sha256HashSchema,
  rendererContractVersion: Schema.Literal(RENDERER_CONTRACT_VERSION),
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
        new ContractDecodeError({ cause, contract, message: String(cause) })
    )
  );
}

/** Hashes the canonical base and domain-scoped renderer contract. */
const hashRendererContract = Effect.fn("AksaraContracts.hashRendererContract")(
  (input: {
    readonly base: RendererManifestEnvelope["base"];
    readonly domains: readonly RendererDomainCapability[];
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
    Effect.flatMap(normalizeRendererSelection),
    Effect.flatMap((contract) =>
      hashRendererContract(contract).pipe(
        Effect.flatMap((hash) =>
          decodeContract(
            RendererManifestEnvelopeSchema,
            "RendererManifestEnvelope",
            {
              ...contract,
              format: RENDERER_MANIFEST_FORMAT,
              hash,
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
      normalizeRendererSelection(wire).pipe(
        Effect.flatMap((contract) =>
          hashRendererContract(contract).pipe(
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
                { ...wire, ...contract }
              )
            )
          )
        )
      )
    )
  )
);
