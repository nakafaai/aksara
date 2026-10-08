import { canonicalQuestionBlueprint } from "#contracts/question/item";
import {
  canonicalQuestionResponse,
  canonicalQuestionResponseStructure,
} from "#contracts/question/response";
import { encodeJsonText } from "#contracts/text/json";
import { canonicalAssessmentLanguagePolicy } from "#contracts/tryout/language";
import type { TryoutPlacement } from "#contracts/tryout/placement";

/** Serializes assessed prompt facts reused across application locales. */
export function canonicalizeAssessedLanguagePlacementFacts(
  row: TryoutPlacement
) {
  return encodeJsonText({
    deliveryLanguage: row.deliveryLanguage,
    questionArtifactHash: row.questionArtifactHash,
    questionArtifactLocale: row.questionArtifactLocale,
    questionContentKey: row.questionContentKey,
    response: canonicalQuestionResponse(row.response),
  });
}

/** Serializes placement facts that cannot vary with application locale. */
export function canonicalizeLocaleNeutralPlacementFacts(row: TryoutPlacement) {
  return encodeJsonText({
    answerContentKey: row.answerContentKey,
    ...(row.blueprint === undefined
      ? {}
      : { blueprint: canonicalQuestionBlueprint(row.blueprint) }),
    languagePolicy: canonicalAssessmentLanguagePolicy(row.languagePolicy),
    ...(row.points === undefined ? {} : { points: row.points }),
    questionContentKey: row.questionContentKey,
    questionSourcePath: row.questionSourcePath,
    rendererDomain: row.rendererDomain,
    response: canonicalQuestionResponseStructure(row.response),
    scope: row.scope,
    sourceRevision: row.sourceRevision,
    ...(row.stimulusKey === undefined ? {} : { stimulusKey: row.stimulusKey }),
  });
}
