import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import { hashText } from "#contracts/hash/text";
import {
  RendererComponentNameSchema,
  sortRendererComponents,
} from "#contracts/renderer/component";
import {
  canonicalizeRendererManifestContract,
  RENDERER_MANIFEST_FORMAT,
  RendererManifestDomainsSchema,
  type RendererManifestEnvelope,
  RendererManifestEnvelopeSchema,
  RendererManifestHashComputeError,
  RendererManifestHashMismatchError,
  sortRendererDomains,
} from "#contracts/renderer/contract";
import { RendererDomainSchema } from "#contracts/renderer/domain";
import { compareCodeUnits } from "#contracts/text/order";

const RendererManifestCreationSchema = Schema.Struct({
  base: Schema.Array(RendererComponentNameSchema),
  domains: Schema.Array(
    Schema.Struct({
      components: Schema.Array(RendererComponentNameSchema),
      name: RendererDomainSchema,
    })
  ),
  publishedDomains: Schema.Array(RendererDomainSchema),
});

/** Hashes the canonical current names and their physical domain ownership. */
const hashRendererContract = Effect.fn("AksaraContracts.hashRendererContract")(
  (
    input: Pick<
      RendererManifestEnvelope,
      "base" | "domains" | "publishedDomains"
    >
  ) =>
    hashText(canonicalizeRendererManifestContract(input)).pipe(
      Effect.mapError(
        ({ cause }) => new RendererManifestHashComputeError({ cause })
      )
    )
);

/** Creates a complete authenticated manifest from one current name set. */
export const createRendererManifest = Effect.fn(
  "AksaraContracts.createRendererManifest"
)(function* (input: unknown) {
  const wire = yield* decodeContract(
    RendererManifestCreationSchema,
    "RendererManifestCreation",
    input
  );
  const domains = yield* decodeContract(
    RendererManifestDomainsSchema,
    "RendererManifestDomains",
    sortRendererDomains(
      wire.domains.map(({ name, components }) => ({
        components: sortRendererComponents(components),
        name,
      }))
    )
  );
  const contract = {
    base: sortRendererComponents(wire.base),
    domains,
    publishedDomains: [...wire.publishedDomains].sort(compareCodeUnits),
  };
  const hash = yield* hashRendererContract(contract);
  return yield* decodeContract(
    RendererManifestEnvelopeSchema,
    "RendererManifestEnvelope",
    {
      ...contract,
      format: RENDERER_MANIFEST_FORMAT,
      hash,
    }
  );
});

/** Authenticates the complete current renderer contract without normalization. */
export const validateRendererManifestHash = Effect.fn(
  "AksaraContracts.validateRendererManifestHash"
)(function* (input: unknown) {
  const manifest = yield* decodeContract(
    RendererManifestEnvelopeSchema,
    "RendererManifestEnvelope",
    input
  );
  const actualHash = yield* hashRendererContract(manifest);
  if (actualHash !== manifest.hash) {
    return yield* new RendererManifestHashMismatchError({
      actualHash,
      expectedHash: manifest.hash,
    });
  }
  return manifest;
});
