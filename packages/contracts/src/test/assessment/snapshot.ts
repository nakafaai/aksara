import { Array as Arr, Effect, Schema } from "effect";

import { CatalogRowSchema } from "#contracts/assessment/catalog";
import {
  hashExamProfile,
  hashItemVersion,
  hashPaper,
  hashStimulusVersion,
} from "#contracts/assessment/hash";
import {
  ItemVersionBodySchema,
  ItemVersionSchema,
} from "#contracts/assessment/item";
import { PaperSchema } from "#contracts/assessment/paper";
import { ExamProfileSchema } from "#contracts/assessment/profile";
import {
  AssessmentRowOrder,
  AssessmentRowSchema,
  hashAssessmentRow,
} from "#contracts/assessment/snapshot";
import {
  StimulusVersionBodySchema,
  StimulusVersionSchema,
} from "#contracts/assessment/stimulus";
import { makeLearningGraphIdentity } from "#contracts/graph/identity";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import {
  doc,
  note,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { plainPart, singleChoice } from "#contracts/test/assessment/item";

/** The one test-only shared reading of the fixture exam. */
export const TEST_STIMULUS =
  "test-country/test-exam/test-section/test-set/passage-1";

/** The one test-only family of the fixture exam. */
export const TEST_FAMILY =
  "test-country/test-exam/test-section/test-set/question-1";

/** A plain text in every active app locale. */
function everyLocale(value: string) {
  return { de: `${value} de`, en: `${value} en`, id: `${value} id` };
}

/** The test-only profile: one section of one choice item, scored raw. */
export const testProfile = Schema.decodeSync(ExamProfileSchema)({
  accommodations: { assigned: [], recorded: [], universal: [] },
  breaks: [],
  defaults: [{ interaction: "choice", rule: { kind: "allOrNothing" } }],
  graceSeconds: 75,
  id: "test-country/test-exam/test-track",
  names: everyLocale("Test exam"),
  report: { sections: false, standardError: false, total: true },
  sampledMath: "score",
  scoring: { kind: "raw" },
  sections: [
    {
      id: "test-section",
      interactions: ["choice"],
      items: 1,
      names: everyLocale("Test section"),
      navigation: "free",
      seconds: 60,
      tools: ["mark-for-review"],
    },
  ],
  totalSeconds: 60,
  writeAllowanceSeconds: 5,
});

/** Builds one catalog row of every kind in one app locale for the fixture exam. */
const catalogRows = Effect.fn("AksaraContracts.testCatalogRows")(
  function* (paper: { readonly hash: string; readonly id: string }) {
    return yield* Effect.forEach(ACTIVE_APP_LOCALES, (appLocale) =>
      Effect.gen(function* () {
        const graph = yield* makeLearningGraphIdentity({
          appLocale,
          concept: ["tryout", "test-country"],
          learningObject: ["tryout-test", "test-country"],
          lens: ["tryout", "test-country", "catalog"],
        });
        const shared = {
          appLocale,
          countryKey: "test-country",
          graph,
          order: 1,
          sourceRevision: "2026-10-26",
        };
        const exam = { ...shared, examKey: "test-exam" };
        const track = { ...exam, trackKey: "test-track" };
        const set = { ...track, setKey: "test-set" };
        return yield* Schema.decodeEffect(Schema.Array(CatalogRowSchema))([
          {
            ...shared,
            countryCode: "ZZ",
            kind: "country",
            publicPath: "try-out/test-country",
            title: "Test country",
          },
          {
            ...exam,
            kind: "exam",
            publicPath: "try-out/test-country/test-exam",
            title: "Test exam",
          },
          {
            ...track,
            kind: "track",
            publicPath: "try-out/test-country/test-exam/test-track",
            title: "Test track",
            trackKind: "subject",
          },
          {
            ...set,
            internalEntrySectionKey: "test-section",
            kind: "set",
            paper,
            publicPath: "try-out/test-country/test-exam/test-track/test-set",
            title: "Test set",
          },
          {
            ...set,
            kind: "section",
            sectionKey: "test-section",
            title: "Test section",
            visibility: "internal-entry",
          },
        ]);
      })
    );
  }
);

/**
 * Builds the rows of a complete, closed test-only assessment snapshot: its
 * catalog, profile, paper, family, item version, key, and an explanation in
 * every active app locale, each hashed, in canonical order.
 */
export const makeAssessmentTestRecords = Effect.fn(
  "AksaraContracts.makeAssessmentTestRecords"
)(function* () {
  const reading = yield* Schema.decodeEffect(StimulusVersionBodySchema)({
    deliveryLanguage: "id",
    document: note("Bacaan."),
    id: TEST_STIMULUS,
  });
  const stimulus = StimulusVersionSchema.make({
    ...reading,
    hash: yield* hashStimulusVersion(reading),
  });
  const reference = { hash: stimulus.hash, id: stimulus.id };
  const body = yield* Schema.decodeUnknownEffect(ItemVersionBodySchema)({
    deliveryLanguage: "id",
    family: TEST_FAMILY,
    interactions: [
      singleChoice([
        plainPart("option-1", "Satu"),
        plainPart("option-2", "Dua"),
      ]),
    ],
    prompt: doc(paragraph(text("Pilih satu.")), place("answer")),
    scoring: [],
    stimulus: reference,
  });
  const version = ItemVersionSchema.make({
    ...body,
    hash: yield* hashItemVersion(body),
  });
  const profileHash = yield* hashExamProfile(testProfile);
  const paper = {
    id: "test-country/test-exam/test-track/test-set",
    profile: { hash: profileHash, id: testProfile.id },
    sections: [
      {
        placements: [{ family: version.family, hash: version.hash }],
        section: "test-section",
      },
    ],
    stimuli: [reference],
  };
  const paperHash = yield* hashPaper(
    yield* Schema.decodeUnknownEffect(PaperSchema)(paper)
  );
  const catalog = Arr.flatten(
    yield* catalogRows({ hash: paperHash, id: paper.id })
  );
  const rows = Arr.sort(
    yield* Schema.decodeUnknownEffect(Schema.Array(AssessmentRowSchema))([
      ...Arr.map(catalog, (row) => ({ kind: "catalog", row })),
      { hash: profileHash, kind: "profile", profile: testProfile },
      { hash: paperHash, kind: "paper", paper },
      { family: { id: version.family, stimulus: stimulus.id }, kind: "family" },
      { kind: "stimulus", version: stimulus },
      { kind: "item", version },
      {
        key: {
          answers: [
            { correct: ["option-1"], interaction: "answer", kind: "choice" },
          ],
          version: version.hash,
        },
        kind: "key",
      },
      ...Arr.map(ACTIVE_APP_LOCALES, (language) => ({
        explanation: {
          document: note("Karena."),
          language,
          version: version.hash,
        },
        kind: "explanation",
      })),
    ]),
    AssessmentRowOrder
  );
  return yield* Effect.forEach(rows, (row) =>
    Effect.map(hashAssessmentRow(row), (rowHash) => ({ row, rowHash }))
  );
});
