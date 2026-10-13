import { Array as Arr, HashSet, Schema } from "effect";

import {
  ExamProfileIdSchema,
  hasDistinctIds,
  KebabKeySchema,
} from "#contracts/assessment/identity";
import { InteractionKindSchema } from "#contracts/assessment/interaction";
import {
  LocalizedTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";
import {
  DefaultRuleSchema,
  ScoreScaleSchema,
  ScoringStrategySchema,
} from "#contracts/assessment/scoring";
import { ToolSetSchema } from "#contracts/assessment/tools";

/**
 * One section of an exam: its name in every language, how many items it has,
 * how long it lasts, how a learner moves through it, which interactions it
 * allows, and which tools it enables.
 */
export const SectionTemplateSchema = Schema.Struct({
  id: KebabKeySchema,
  interactions: Schema.NonEmptyArray(InteractionKindSchema).check(
    Schema.makeFilter(hasDistinctIds, {
      message: "Expected each interaction kind once.",
    })
  ),
  items: PositiveIntSchema,
  names: LocalizedTextSchema,
  navigation: Schema.Literals(["free", "linear"]),
  seconds: PositiveIntSchema,
  tools: ToolSetSchema,
});
export type SectionTemplate = typeof SectionTemplateSchema.Type;

/** A pause between two sections, in seconds. */
export const BreakSchema = Schema.Struct({
  after: KebabKeySchema,
  seconds: PositiveIntSchema,
});

/**
 * What a learner can switch on without asking, what a teacher or an admin
 * assigns before the exam, and what a school records with evidence.
 */
export const AccommodationCatalogSchema = Schema.Struct({
  /** Tier 2: support assigned before the exam. */
  assigned: Schema.Array(
    Schema.Literals(["text-to-speech", "high-contrast", "separate-room"])
  ).check(
    Schema.makeFilter(hasDistinctIds, {
      message: "Expected each assigned support once.",
    })
  ),
  /**
   * Tier 3: accommodations recorded with evidence. They are frozen when an
   * attempt starts, and every later change is an event.
   */
  recorded: Schema.Array(
    Schema.Union([
      Schema.Struct({
        kind: Schema.Literal("extraTime"),
        maxPercent: PositiveIntSchema,
      }),
      Schema.Struct({
        kind: Schema.Literal("extraBreak"),
        maxSeconds: PositiveIntSchema,
      }),
      Schema.Struct({
        kind: Schema.Literals(["reader", "scribe", "alternateFormat"]),
      }),
    ])
  ).check(
    Schema.makeFilter(
      (recorded) => hasDistinctIds(Arr.map(recorded, ({ kind }) => kind)),
      {
        message: "Expected each recorded accommodation once.",
      }
    )
  ),
  /** Tier 1: tools for every learner, who sets them at any time. */
  universal: ToolSetSchema,
});

/** What the result page shows. A score from IRT always shows its standard error. */
export const ReportFormSchema = Schema.Struct({
  sections: Schema.Boolean,
  standardError: Schema.Boolean,
  total: Schema.Boolean,
});

/** The rule an exam sets for every interaction of one kind. */
const DefaultSchema = Schema.Struct({
  interaction: InteractionKindSchema,
  rule: DefaultRuleSchema,
});

const ProfileFieldsSchema = Schema.Struct({
  accommodations: AccommodationCatalogSchema,
  breaks: Schema.Array(BreakSchema),
  defaults: Schema.Array(DefaultSchema),
  id: ExamProfileIdSchema,
  names: LocalizedTextSchema,
  report: ReportFormSchema,
  scale: Schema.optionalKey(ScoreScaleSchema),
  scoring: ScoringStrategySchema,
  sections: Schema.NonEmptyArray(SectionTemplateSchema).check(
    Schema.makeFilter(
      (sections) => hasDistinctIds(Arr.map(sections, ({ id }) => id)),
      { message: "Expected each section once." }
    )
  ),
  totalSeconds: PositiveIntSchema,
});

/** Checks that the total is the sum of the sections. */
function hasSectionTotal(profile: typeof ProfileFieldsSchema.Type) {
  return (
    Arr.reduce(profile.sections, 0, (total, { seconds }) => total + seconds) ===
    profile.totalSeconds
  );
}

/** Checks that each break comes after a section that another section follows. */
function hasBreaksBetweenSections(profile: typeof ProfileFieldsSchema.Type) {
  const followed = Arr.map(Arr.dropRight(profile.sections, 1), ({ id }) => id);
  return (
    hasDistinctIds(Arr.map(profile.breaks, ({ after }) => after)) &&
    Arr.every(profile.breaks, ({ after }) => Arr.contains(followed, after))
  );
}

/**
 * Checks that every kind a section allows has one default rule, except an
 * extended text, which carries a rubric of its own, and that no other kind has
 * one.
 */
function hasDefaultRules(profile: typeof ProfileFieldsSchema.Type) {
  const allowed = HashSet.fromIterable(
    Arr.filter(
      Arr.flatMap(profile.sections, ({ interactions }) => interactions),
      (kind) => kind !== "extendedText"
    )
  );
  const defaulted = Arr.map(profile.defaults, ({ interaction }) => interaction);
  return (
    hasDistinctIds(defaulted) &&
    HashSet.size(allowed) === defaulted.length &&
    Arr.every(defaulted, (kind) => HashSet.has(allowed, kind))
  );
}

/**
 * Checks that the scoring strategy, the scale, and the report agree. A score
 * from IRT or a composite has a scale; a raw or penalized score is a sum and
 * has none. Only IRT has a standard error, and it always shows it. The report
 * shows the total, the sections, or both.
 */
function hasCoherentReport(profile: typeof ProfileFieldsSchema.Type) {
  const scaled =
    profile.scoring.kind === "irt" || profile.scoring.kind === "composite";
  return (
    scaled === (profile.scale !== undefined) &&
    profile.report.standardError === (profile.scoring.kind === "irt") &&
    (profile.report.total || profile.report.sections)
  );
}

/**
 * An exam profile: signed data that a country profile carries, not code. Try-outs
 * and school exams use the same profile. It holds the official names, the
 * sections, the total time, the breaks, the default scoring rules for every
 * interaction kind, the scoring strategy and its scale, the accommodations, and
 * the form of the report.
 */
export const ExamProfileSchema = ProfileFieldsSchema.check(
  Schema.makeFilter(hasSectionTotal, {
    message: "Expected the total time to be the sum of the section times.",
  }),
  Schema.makeFilter(hasBreaksBetweenSections, {
    message:
      "Expected each break after a section that another section follows.",
  }),
  Schema.makeFilter(hasDefaultRules, {
    message:
      "Expected one default rule for each allowed interaction kind except an extended text.",
  }),
  Schema.makeFilter(hasCoherentReport, {
    message:
      "Expected a scale for IRT and composite scores only, a standard error for IRT scores only, and a report of the total or the sections.",
  })
);
export type ExamProfile = typeof ExamProfileSchema.Type;
