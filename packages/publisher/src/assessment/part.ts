import type { Field } from "@nakafa/aksara-compiler/assessment/error";
import { canSitInText } from "@nakafa/aksara-contracts/assessment/interaction";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import type { PartSource } from "@nakafa/aksara-corpus/question-bank/part";
import {
  exactTextKey,
  partInteraction,
} from "@nakafa/aksara-corpus/question-bank/part";
import { Array as Arr, String as Str } from "effect";
import { ANSWER_LABELS } from "#publisher/assessment/interaction";

/**
 * The two levels of a rubric criterion as a learner reads them, in the
 * language the item is asked in: missed, worth nothing, and met, worth the
 * criterion's points.
 */
const LEVEL_LABELS = {
  de: { met: "Erfüllt", missed: "Nicht erfüllt" },
  en: { met: "Met", missed: "Not met" },
  id: { met: "Terpenuhi", missed: "Belum terpenuhi" },
  ms: { met: "Dipenuhi", missed: "Belum dipenuhi" },
} satisfies Record<AppLocaleCode, { met: string; missed: string }>;

/**
 * What earns the missed level of a criterion, for a grader: work that does
 * not show what the criterion's met level asks.
 */
const MISSED_DESCRIPTORS = {
  de: "Die Arbeit zeigt nicht, was das Kriterium verlangt.",
  en: "The work does not show what the criterion asks for.",
  id: "Jawaban belum menunjukkan apa yang diminta kriteria ini.",
  ms: "Jawapan belum menunjukkan apa yang diminta oleh kriteria ini.",
} satisfies Record<AppLocaleCode, string>;

/** The identifier of one rubric criterion, by its one-based position. */
function criterionId(index: number) {
  return `criterion-${index + 1}`;
}

/**
 * The interaction of one part, which a screen reader names as the answer to
 * the part, such as `Antwort a`. A typed number takes a fraction such as `3/4`
 * exactly when its value is not a whole number.
 */
function interactionOf(part: PartSource, language: AppLocaleCode) {
  const fields = {
    id: partInteraction(part.label),
    label: `${ANSWER_LABELS[language]} ${part.label}`,
  };
  if (part.kind !== "numericEntry") {
    return { ...fields, kind: part.kind };
  }
  return {
    ...fields,
    acceptsFractions: Str.includes(".")(part.value),
    kind: part.kind,
    ...(part.unit === undefined ? {} : { unit: part.unit }),
  };
}

/**
 * The key of one part: the expression, the value, or the accepted texts it is
 * matched against, or for a written answer what earns each level of each
 * criterion.
 */
function keyOf(part: PartSource, language: AppLocaleCode) {
  const interaction = partInteraction(part.label);
  if (part.kind === "mathEntry") {
    return { expression: part.expression, interaction, kind: part.kind };
  }
  if (part.kind === "numericEntry") {
    return { interaction, kind: part.kind, value: part.value };
  }
  if (part.kind === "textEntry") {
    return {
      accepted: exactTextKey(part.accepted),
      interaction,
      kind: part.kind,
    };
  }
  return {
    criteria: Arr.map(part.rubric, ({ met }, index) => ({
      criterion: criterionId(index),
      levels: [
        { descriptor: MISSED_DESCRIPTORS[language], level: "missed" },
        { descriptor: met, level: "met" },
      ],
    })),
    interaction,
    kind: part.kind,
  };
}

/**
 * The rule that scores one part with its own points: a typed answer earns all
 * of them or none, and a written answer earns the points of each criterion it
 * meets.
 */
function ruleOf(part: PartSource, language: AppLocaleCode) {
  if (part.kind !== "extendedText") {
    return { floor: 0, kind: "perPart", pointsPerPart: part.points };
  }
  return {
    criteria: Arr.map(part.rubric, ({ label, points }, index) => ({
      id: criterionId(index),
      label,
      levels: [
        { id: "missed", label: LEVEL_LABELS[language].missed, points: 0 },
        { id: "met", label: LEVEL_LABELS[language].met, points },
      ],
    })),
    kind: "rubric",
  };
}

/**
 * Assembles the parts of one item version in its language: for each part,
 * in order, its interaction, its key, the scoring rule of its points, and the
 * field its prompt places. A typed answer may sit inside a line of text; a
 * written answer sits on a line of its own.
 */
export function assembleParts(
  parts: readonly PartSource[],
  language: AppLocaleCode
) {
  return {
    fields: Arr.map(
      parts,
      (part): Field => ({
        inline: canSitInText(part.kind),
        interaction: partInteraction(part.label),
        part: part.label,
      })
    ),
    interactions: Arr.map(parts, (part) => interactionOf(part, language)),
    keys: Arr.map(parts, (part) => keyOf(part, language)),
    scoring: Arr.map(parts, (part) => ({
      interaction: partInteraction(part.label),
      rule: ruleOf(part, language),
    })),
  };
}
