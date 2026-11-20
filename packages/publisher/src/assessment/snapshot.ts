import type {
  compileExplanationDocument,
  compileReadingDocument,
} from "@nakafa/aksara-compiler/assessment/document";
import type {
  hashPaper,
  hashStimulusVersion,
} from "@nakafa/aksara-contracts/assessment/hash";
import { hashExamProfile } from "@nakafa/aksara-contracts/assessment/hash";
import type {
  verifyPaperPlaces,
  verifyPaperStimuli,
} from "@nakafa/aksara-contracts/assessment/paper";
import type { AssessmentRow } from "@nakafa/aksara-contracts/assessment/snapshot";
import {
  AssessmentRowOrder,
  digestAssessmentRows,
  hashAssessmentRow,
  makeAssessmentSnapshot,
} from "@nakafa/aksara-contracts/assessment/snapshot";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { projectTryoutCatalog } from "@nakafa/aksara-corpus/tryout/catalog";
import type { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { makeExamProfile } from "@nakafa/aksara-corpus/tryout/profile";
import type { FileSystem, Path, Schema } from "effect";
import { Array as Arr, Effect, Option, Stream } from "effect";
import type { PartsReleaseError } from "#publisher/assessment/guard";
import {
  NAKAFA_SERVES_PARTS,
  requireServableParts,
} from "#publisher/assessment/guard";
import type {
  AssembledItem,
  AssembleItemError,
} from "#publisher/assessment/item";
import { freezePaper } from "#publisher/assessment/paper";

type TryoutContent = Effect.Success<ReturnType<typeof loadTryoutContent>>;

/** The rows that one assembled item contributes. */
function itemRows(item: AssembledItem): readonly AssessmentRow[] {
  return [
    { family: item.family, kind: "family" },
    ...Arr.map(item.versions, (version) => ({
      kind: "item" as const,
      version,
    })),
    ...Arr.map(item.keys, (key) => ({ key, kind: "key" as const })),
    ...Arr.map(item.explanations, (explanation) => ({
      explanation,
      kind: "explanation" as const,
    })),
  ];
}

/** The checkout and the loaded try-out content that one snapshot publishes. */
export interface AssessmentSnapshotInput {
  readonly checkoutRoot: string;
  readonly content: TryoutContent;
}

/** One prepared assessment snapshot: its manifest and its replayable rows. */
export interface PreparedAssessmentSnapshot {
  readonly manifest: Extract<ContentSnapshotManifest, { family: "assessment" }>;
  readonly rows: Stream.Stream<ContentSnapshotRow>;
}

/** Every failure of preparing the assessment snapshot. */
export type PrepareAssessmentSnapshotError =
  | PartsReleaseError
  | AssembleItemError
  | Schema.SchemaError
  | Effect.Error<ReturnType<typeof compileExplanationDocument>>
  | Effect.Error<ReturnType<typeof compileReadingDocument>>
  | Effect.Error<ReturnType<typeof hashStimulusVersion>>
  | Effect.Error<ReturnType<typeof verifyPaperStimuli>>
  | Effect.Error<ReturnType<typeof verifyPaperPlaces>>
  | Effect.Error<ReturnType<typeof hashPaper>>
  | Effect.Error<ReturnType<typeof makeExamProfile>>
  | Effect.Error<ReturnType<typeof hashExamProfile>>
  | Effect.Error<ReturnType<typeof projectTryoutCatalog>>
  | Effect.Error<ReturnType<typeof hashAssessmentRow>>
  | Effect.Error<ReturnType<typeof digestAssessmentRows<never, never>>>
  | Effect.Error<ReturnType<typeof makeAssessmentSnapshot>>;

/**
 * Prepares the assessment snapshot of the active try-outs: the profile of
 * every track, the frozen paper of every set with its items, readings, keys,
 * and explanations, and the catalog that names the papers, as hashed rows in
 * canonical order with the digest over them. It refuses items with parts
 * until Nakafa production serves them (`assessment/guard`).
 */
export const prepareAssessmentSnapshot: (
  input: AssessmentSnapshotInput
) => Effect.Effect<
  PreparedAssessmentSnapshot,
  PrepareAssessmentSnapshotError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.prepareAssessmentSnapshot")(function* (
  input: AssessmentSnapshotInput
) {
  yield* requireServableParts(input.content.sets, NAKAFA_SERVES_PARTS);
  const tracks = yield* Effect.forEach(
    Arr.flatMap(input.content.exams, (exam) =>
      Arr.map(exam.tracks, (track) => ({ exam, track }))
    ),
    ({ exam, track }) =>
      Effect.gen(function* () {
        const profile = yield* makeExamProfile(exam, track);
        const hash = yield* hashExamProfile(profile);
        const papers = yield* Effect.forEach(
          Arr.filter(
            input.content.papers,
            (plan) => plan.profile === profile.id
          ),
          (plan) =>
            freezePaper(input.checkoutRoot, plan, { hash, id: profile.id })
        );
        return { hash, papers, profile };
      })
  );
  const papers = Arr.flatMap(tracks, (track) => track.papers);
  const catalog = yield* projectTryoutCatalog(input.content.exams, (id) =>
    Option.map(
      Arr.findFirst(papers, ({ paper }) => paper.id === id),
      ({ appLocales, hash, paper }) => ({ appLocales, hash, id: paper.id })
    )
  );
  const sets = Arr.flatMap(papers, ({ assembled }) => assembled);
  const rows = Arr.sort(
    [
      ...Arr.map(catalog, (row): AssessmentRow => ({ kind: "catalog", row })),
      ...Arr.map(
        tracks,
        ({ hash, profile }): AssessmentRow => ({
          hash,
          kind: "profile",
          profile,
        })
      ),
      ...Arr.map(
        papers,
        ({ hash, paper }): AssessmentRow => ({ hash, kind: "paper", paper })
      ),
      ...Arr.flatMap(sets, ({ items }) => Arr.flatMap(items, itemRows)),
      ...Arr.flatMap(sets, ({ stimuli }) =>
        Arr.flatMap(stimuli, ({ versions }) =>
          Arr.map(
            versions,
            (version): AssessmentRow => ({ kind: "stimulus", version })
          )
        )
      ),
    ],
    AssessmentRowOrder
  );
  const records = yield* Effect.forEach(rows, (row) =>
    Effect.map(hashAssessmentRow(row), (rowHash) => ({ row, rowHash }))
  );
  const { counts, rowDigest } = yield* digestAssessmentRows(
    Stream.fromIterable(records)
  );
  const snapshot = yield* makeAssessmentSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    counts,
    rowDigest,
  });
  return {
    manifest: { family: "assessment" as const, manifest: snapshot },
    rows: Stream.fromIterable(
      Arr.map(
        records,
        (record): ContentSnapshotRow => ({ family: "assessment", record })
      )
    ),
  };
});
