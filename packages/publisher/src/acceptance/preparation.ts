import type { GitCommitSha, ReleaseId } from "@nakafa/aksara-contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  type ProgramRowError,
  prepareProgramSnapshot,
} from "@nakafa/aksara-corpus/program/snapshot";
import { prepareQuranSnapshot } from "@nakafa/aksara-corpus/quran/snapshot";
import { Effect, type FileSystem, type Path, type Scope, Stream } from "effect";
import { prepareAcceptanceCatalog } from "#publisher/acceptance/catalog";
import { prepareAssessmentSnapshot } from "#publisher/assessment/snapshot";
import { prepareContentRelease } from "#publisher/preparation";
import type { ReplaySpoolError } from "#publisher/replay/error";

type AcceptanceReleaseRowsError =
  | ReplaySpoolError
  | ProgramRowError
  | Stream.Error<
      Effect.Success<ReturnType<typeof prepareQuranSnapshot>>["rows"]
    >;
type PreparedAcceptanceRelease = ReturnType<
  typeof prepareContentRelease<AcceptanceReleaseRowsError, never>
>;
type AcceptancePreparationError =
  | Effect.Error<PreparedAcceptanceRelease>
  | Effect.Error<ReturnType<typeof prepareAcceptanceCatalog>>
  | Effect.Error<ReturnType<typeof prepareProgramSnapshot>>
  | Effect.Error<ReturnType<typeof prepareQuranSnapshot>>
  | Effect.Error<ReturnType<typeof prepareAssessmentSnapshot>>;

/** Prepares an independent signed genesis publication for isolated acceptance, with canonical signed evidence. */
export const prepareAcceptanceRelease: (input: {
  readonly aksaraSha: GitCommitSha;
  readonly checkoutRoot: string;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: unknown;
}) => Effect.Effect<
  Effect.Success<PreparedAcceptanceRelease>,
  AcceptancePreparationError,
  FileSystem.FileSystem | Path.Path | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareAcceptanceRelease")(function* (input) {
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  const catalog = yield* prepareAcceptanceCatalog({
    ...input,
    rendererManifest,
  });
  const program = yield* prepareProgramSnapshot();
  const quran = yield* prepareQuranSnapshot({
    checkoutRoot: input.checkoutRoot,
  });
  const assessment = yield* prepareAssessmentSnapshot({
    checkoutRoot: input.checkoutRoot,
    content: catalog.tryout,
  });
  const manifests: readonly ContentSnapshotManifest[] = [
    assessment.manifest,
    { family: "program", manifest: program.manifest },
    { family: "quran", manifest: quran.manifest },
  ];
  const rows = assessment.rows.pipe(
    Stream.concat(
      program.rows.pipe(
        Stream.map(
          (record) =>
            ({ family: "program", record }) satisfies ContentSnapshotRow
        )
      )
    ),
    Stream.concat(
      quran.rows.pipe(
        Stream.map(
          (record) => ({ family: "quran", record }) satisfies ContentSnapshotRow
        )
      )
    )
  );
  return yield* prepareContentRelease<AcceptanceReleaseRowsError, never>({
    ...input,
    baseActiveAppLocales: null,
    baseManifestHash: null,
    baseReleaseId: null,
    baseRendererManifestHash: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    previousSnapshots: null,
    records: catalog.records,
    rendererManifest,
    result: catalog.result,
    routes: catalog.routes,
    scope: {
      families: ["article", "material", "page"],
      snapshots: ContentSnapshotKindSchema.literals,
    },
    snapshotManifests: Stream.fromIterable(manifests),
    snapshotRows: rows,
  });
});
