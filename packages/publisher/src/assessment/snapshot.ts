import { compileContentDocument } from "@nakafa/aksara-compiler/assessment/document";
import {
  hashExamProfile,
  hashPaper,
  hashStimulusVersion,
} from "@nakafa/aksara-contracts/assessment/hash";
import {
  ItemFamilyIdSchema,
  PaperIdSchema,
  StimulusIdSchema,
} from "@nakafa/aksara-contracts/assessment/identity";
import type { StimulusReference } from "@nakafa/aksara-contracts/assessment/item";
import {
  type Paper,
  PaperSchema,
  verifyPaperStimuli,
} from "@nakafa/aksara-contracts/assessment/paper";
import {
  type AssessmentRow,
  AssessmentRowOrder,
  digestAssessmentRows,
  hashAssessmentRow,
  makeAssessmentSnapshot,
} from "@nakafa/aksara-contracts/assessment/snapshot";
import { StimulusVersionSchema } from "@nakafa/aksara-contracts/assessment/stimulus";
import {
  ACTIVE_APP_LOCALES,
  ContentLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import type { QuestionSet } from "@nakafa/aksara-corpus/question-bank/source";
import { projectTryoutCatalog } from "@nakafa/aksara-corpus/tryout/catalog";
import type { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { makeExamProfile } from "@nakafa/aksara-corpus/tryout/profile";
import type { PaperPlan } from "@nakafa/aksara-corpus/tryout/projection";
import type { FileSystem, Path } from "effect";
import {
  Array as Arr,
  Effect,
  Option,
  Record as Rec,
  Schema,
  Stream,
} from "effect";
import {
  type AssembledItem,
  type AssembleItemError,
  assembleItem,
  readAssessmentSource,
} from "#publisher/assessment/item";

type TryoutContent = Effect.Success<ReturnType<typeof loadTryoutContent>>;

/** The identity of one question or reading: its set and its folder. */
function bankId(set: string, folder: string) {
  return `${set}/${folder}`;
}

/** Compiles the shared readings of one set, each in every language it is written in. */
const compileStimuli = Effect.fn("AksaraPublisher.compileStimuli")(function* (
  checkoutRoot: string,
  set: QuestionSet
) {
  return yield* Effect.forEach(set.stimuli, (stimulus) =>
    Effect.gen(function* () {
      const id = StimulusIdSchema.make(bankId(set.path, stimulus.key));
      const versions = yield* Effect.forEach(stimulus.languages, (language) =>
        Effect.gen(function* () {
          const source = yield* readAssessmentSource(
            checkoutRoot,
            `${stimulus.sourceRoot}/stimulus.${language}.mdx`
          );
          const body = {
            deliveryLanguage: ContentLanguageSchema.make(language),
            document: yield* compileContentDocument(source),
            id,
          };
          return StimulusVersionSchema.make({
            ...body,
            hash: yield* hashStimulusVersion(body),
          });
        })
      );
      return { id, key: stimulus.key, versions };
    })
  );
});

/** Assembles every question of one set, each naming the version of its reading in its language. */
const assembleSet = Effect.fn("AksaraPublisher.assembleSet")(function* (
  checkoutRoot: string,
  set: QuestionSet
) {
  const stimuli = yield* compileStimuli(checkoutRoot, set);
  const items = yield* Effect.forEach(set.questions, (question) =>
    assembleItem({
      checkoutRoot,
      familyId: ItemFamilyIdSchema.make(
        bankId(set.path, `question-${question.number}`)
      ),
      question,
      reading: Option.map(
        Arr.findFirst(stimuli, ({ key }) => key === question.item.stimulus),
        ({ id, versions }) => ({
          id,
          versions: Rec.fromEntries(
            Arr.map(versions, (version): [string, StimulusReference] => [
              version.deliveryLanguage,
              { hash: version.hash, id },
            ])
          ),
        })
      ),
    })
  );
  return { items, stimuli };
});

/**
 * Freezes the paper of one plan: each section places the version of each of
 * its questions in the section's language, and the paper lists the readings
 * those versions use, checked before the paper is hashed.
 */
const freezePaper = Effect.fn("AksaraPublisher.freezePaper")(function* (
  checkoutRoot: string,
  plan: PaperPlan,
  profile: Paper["profile"]
) {
  const sections = yield* Effect.forEach(plan.sections, (section) =>
    Effect.map(assembleSet(checkoutRoot, section.set), (assembled) => ({
      assembled,
      section: section.key,
      versions: Arr.flatMap(assembled.items, (item) =>
        Arr.filter(
          item.versions,
          ({ deliveryLanguage }) => deliveryLanguage === section.language
        )
      ),
    }))
  );
  const versions = Arr.flatMap(sections, (section) => section.versions);
  const stimuli = Arr.flatMap(versions, ({ stimulus }) =>
    Option.toArray(Option.fromUndefinedOr(stimulus))
  );
  const paper = yield* Schema.decodeUnknownEffect(PaperSchema)({
    id: PaperIdSchema.make(plan.id),
    profile,
    sections: Arr.map(sections, ({ section, versions: placed }) => ({
      placements: Arr.map(placed, ({ family, hash }) => ({ family, hash })),
      section,
    })),
    stimuli: Arr.dedupeWith(
      stimuli,
      (left, right) => left.id === right.id && left.hash === right.hash
    ),
  });
  yield* verifyPaperStimuli(paper, versions);
  return {
    assembled: Arr.map(sections, ({ assembled }) => assembled),
    hash: yield* hashPaper(paper),
    paper,
  };
});

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
  | AssembleItemError
  | Schema.SchemaError
  | Effect.Error<ReturnType<typeof compileContentDocument>>
  | Effect.Error<ReturnType<typeof hashStimulusVersion>>
  | Effect.Error<ReturnType<typeof verifyPaperStimuli>>
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
 * canonical order with the digest over them.
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
      ({ hash, paper }) => ({ hash, id: paper.id })
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
