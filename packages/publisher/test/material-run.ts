import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { Effect, Stream } from "effect";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { prepareContentRelease } from "#publisher/preparation";
import { PublicationSource } from "#publisher/publication/spec";
import { testFileLayer } from "#test/files";
import { makeTarget } from "#test/lifecycle";
import { checkoutRoot, rendererManifest, sourceByPath } from "#test/material";
import { publishFromSource } from "#test/publication/run";
import { emptySnapshotSources } from "#test/snapshot";

/** Publishes the real material fixture through exact Git source resolution. */
export async function publishMaterialRelease() {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const material = yield* prepareMaterialPublication({
          checkoutRoot,
          published: Stream.empty,
          rendererManifest,
        });
        const prepared = yield* prepareContentRelease({
          aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
          baseManifestHash: null,
          baseReleaseId: null,
          baseResultCount: 0,
          baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
          previousSnapshots: null,
          records: material.records,
          releaseId: ReleaseIdSchema.make("test-material-replay"),
          rendererManifest,
          result: material.result,
          routes: material.routes,
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
                    contentKey: item.change.contentKey,
                    locale: item.change.locale,
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
    ).pipe(
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}
