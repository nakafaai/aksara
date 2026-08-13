import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { loadStructuredReviewRequirements } from "@nakafa/aksara-corpus/editorial/requirements";
import { Effect, Stream } from "effect";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { prepareContentRelease } from "#publisher/preparation";
import { PublicationSource } from "#publisher/publication/spec";
import { makeEditorialReviewForHeads } from "#test/editorial";
import { testFileLayer } from "#test/files";
import { makeTarget } from "#test/lifecycle/spec";
import {
  checkoutRoot,
  functionMaterialScope,
  rendererManifest,
  sourceByPath,
} from "#test/material/spec";
import { publishFromSource } from "#test/publication/run";
import { emptySnapshotSources, snapshotPolicyBase } from "#test/snapshot";

/** Publishes the real material fixture through exact Git source resolution. */
export async function publishMaterialRelease() {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const material = yield* prepareMaterialPublication({
          checkoutRoot,
          published: Stream.empty,
          rendererManifest,
          scope: functionMaterialScope,
        });
        const resultHeads = yield* material.result().pipe(Stream.runCollect);
        const structuredRequirements = yield* loadStructuredReviewRequirements({
          activeAppLocales: ACTIVE_APP_LOCALES,
          checkoutRoot,
          families: ContentSnapshotKindSchema.literals,
        });
        const editorialReview = yield* Effect.promise(() =>
          makeEditorialReviewForHeads([...resultHeads], structuredRequirements)
        );
        const editorialReviewDigest = editorialReview.digest;
        const prepared = yield* prepareContentRelease({
          aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
          baseResultCount: 0,
          baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
          checkoutRoot,
          editorialReview,
          records: material.records,
          releaseId: ReleaseIdSchema.make("test-material-replay"),
          rendererManifest,
          result: () => Stream.fromIterable(resultHeads),
          routes: material.routes,
          scope: functionMaterialScope,
          ...snapshotPolicyBase(editorialReviewDigest, "test-material-base"),
          ...emptySnapshotSources,
        });
        const state = makeTarget(prepared);
        const source = PublicationSource.of({
          loadExactRevision: ({ items }) =>
            items.pipe(
              Stream.mapEffect((item) => {
                if (item.change.operation === "delete") {
                  return Effect.dieMessage(
                    "Exact-Git source requested for a test tombstone."
                  );
                }
                const rawMdx = sourceByPath.get(
                  resolve(checkoutRoot, item.change.sourcePath)
                );
                if (rawMdx === undefined) {
                  return Effect.dieMessage(
                    `Missing exact test source ${item.change.sourcePath}.`
                  );
                }
                return Effect.succeed(
                  CompileDocumentSourceSchema.make({
                    artifactLocale: item.change.artifactLocale,
                    contentKey: item.change.contentKey,
                    rawMdx,
                    rendererDomain: item.change.rendererDomain,
                    sourcePath: item.change.sourcePath,
                  })
                );
              })
            ),
        });
        const receipt = yield* publishFromSource(
          prepared,
          state.target,
          source
        );
        return { receipt, stageArtifacts: state.stageArtifactBatch };
      })
    ).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
  );
}
