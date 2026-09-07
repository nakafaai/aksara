import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { validateContentCatalog } from "@nakafa/aksara-publisher/catalog/validation";
import { Effect, Schema } from "effect";
import { findAksaraRoot } from "#cli/checkout";
import { readPreviewEnvironment } from "#cli/environment/read";
import {
  readCleanAksaraRevision,
  validateStableAksaraRevision,
} from "#cli/evidence";
import { NakafaAppLive } from "#cli/nakafa";
import { openRendererSession } from "#cli/renderer/session";

/** Signals that the reviewed Quran source is not approved for publication. */
export class CatalogCheckBlockedError extends Schema.TaggedError<CatalogCheckBlockedError>()(
  "CatalogCheckBlockedError",
  { provenanceDigest: Sha256HashSchema }
) {}

/** Runs complete read-only validation against the actual Nakafa renderer. */
export const runCheckCommand = Effect.fn("AksaraCli.runCheckCommand")(
  function* (cwd: string) {
    const aksaraRoot = yield* findAksaraRoot(cwd);
    const revision = yield* readCleanAksaraRevision(aksaraRoot);
    const environment = yield* readPreviewEnvironment();
    const renderer = yield* openRendererSession({
      cwd: aksaraRoot,
      environment,
      selection: { kind: "catalog" },
    });
    const validation = yield* validateContentCatalog({
      checkoutRoot: renderer.aksaraRoot,
      rendererManifest: renderer.manifest,
    });
    const validatedRevision = yield* readCleanAksaraRevision(
      renderer.aksaraRoot
    );
    yield* validateStableAksaraRevision(revision, validatedRevision);
    yield* Effect.logInfo("Complete content catalog validation finished.").pipe(
      Effect.annotateLogs({
        articleCount: validation.articleCount,
        materialCount: validation.materialCount,
        pageCount: validation.pageCount,
        programRows: validation.snapshots.program.rowCount,
        questionCount: validation.questionCount,
        quranProvenance: validation.snapshots.quran.provenanceStatus,
        quranRows: validation.snapshots.quran.projectionCount,
        rendererManifestHash: validation.rendererManifestHash,
        resultDigest: validation.resultDigest,
        routeCount: validation.routeCount,
        tryoutRows:
          validation.snapshots.tryout.catalogCount +
          validation.snapshots.tryout.placementCount,
      })
    );
    if (validation.snapshots.quran.provenanceStatus === "blocked") {
      yield* Effect.logWarning(
        "Quran provenance blocks production publication."
      ).pipe(
        Effect.annotateLogs({
          provenanceDigest: validation.snapshots.quran.provenanceDigest,
        })
      );
      return yield* new CatalogCheckBlockedError({
        provenanceDigest: validation.snapshots.quran.provenanceDigest,
      });
    }
    return validation;
  },
  Effect.provide(NakafaAppLive),
  Effect.scoped
);
