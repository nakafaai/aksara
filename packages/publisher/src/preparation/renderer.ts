import type { CompiledContentPayload } from "@nakafa/aksara-contracts/content";
import { verifyContentRendererCompatibility } from "@nakafa/aksara-contracts/renderer/compatibility";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect } from "effect";

/** Requires one compiled upsert domain to be routable by the deployed app. */
export const requirePublishedRendererDomain = Effect.fn(
  "AksaraPublisher.requirePublishedRendererDomain"
)(
  (
    payload: CompiledContentPayload,
    rendererManifest: RendererManifestEnvelope
  ) =>
    verifyContentRendererCompatibility({
      payload,
      rendererContractVersion: rendererManifest.rendererContractVersion,
      rendererManifest,
    }).pipe(Effect.asVoid)
);
