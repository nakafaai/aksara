import type { GitCommitSha, ReleaseId } from "@nakafa/aksara-contracts/ids";
import type {
  ContentHead,
  QuestionHead,
} from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  type ProgramRowError,
  prepareProgramSnapshot,
} from "@nakafa/aksara-corpus/program/snapshot";
import { prepareQuranSnapshot } from "@nakafa/aksara-corpus/quran/snapshot";
import { Effect, type FileSystem, type Path, type Scope, Stream } from "effect";
import { prepareAcceptanceCatalog } from "#publisher/acceptance/catalog";
import { prepareContentRelease } from "#publisher/preparation";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { prepareTryoutSnapshot } from "#publisher/tryout/snapshot";

/** Selects question heads for exact try-out artifact binding. */
function isQuestion(head: ContentHead): head is QuestionHead {
  return head.family === "question";
}

/** Prepares an independent signed genesis publication for isolated acceptance. */
interface AcceptanceReleaseInput {
  readonly aksaraSha: GitCommitSha;
  readonly checkoutRoot: string;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: unknown;
}
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
  | Effect.Error<
      ReturnType<typeof prepareTryoutSnapshot<ReplaySpoolError, never>>
    >;

/** Prepares an independent genesis publication with canonical signed evidence. */
export const prepareAcceptanceRelease: (
  input: AcceptanceReleaseInput
) => Effect.Effect<
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
  const tryout = yield* prepareTryoutSnapshot({
    checkoutRoot: input.checkoutRoot,
    content: catalog.tryout,
    questionHeads: catalog.result.pipe(Stream.filter(isQuestion)),
    rendererManifest,
  });
  const manifests: readonly ContentSnapshotManifest[] = [
    { family: "program", manifest: program.manifest },
    { family: "quran", manifest: quran.manifest },
    tryout.manifest,
  ];
  const rows = program.rows.pipe(
    Stream.map(
      (record) => ({ family: "program", record }) satisfies ContentSnapshotRow
    ),
    Stream.concat(
      quran.rows.pipe(
        Stream.map(
          (record) => ({ family: "quran", record }) satisfies ContentSnapshotRow
        )
      )
    ),
    Stream.concat(tryout.rows)
  );
  return yield* prepareContentRelease({
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
      families: ["article", "material", "page", "question"],
      snapshots: ["program", "quran", "tryout"],
    },
    snapshotManifests: Stream.fromIterable(manifests),
    snapshotRows: rows,
    tryoutRuntime: { recovery: null, result: tryout.manifest.manifest },
  });
});
