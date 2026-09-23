import { findBodyHighlightIssues } from "#nakafa-content/body/review";
import {
  findEmphasisArtifactIssues,
  findPhraseEmphasisIssues,
} from "#nakafa-content/emphasis/check";
import { findExerciseAnswerIssues } from "#nakafa-content/exercise/answers";
import { findHeadingOrderIssues } from "#nakafa-content/heading/order";
import { findHighlightNestingIssues } from "#nakafa-content/highlight/nesting";
import { findOpeningHighlightIssues } from "#nakafa-content/highlight/opening";
import { findHighlightVariantIssues } from "#nakafa-content/highlight/variant";
import { findExactLineSmoothingIssues } from "#nakafa-content/line/check";
import { findExternalLinkPlacementIssues } from "#nakafa-content/link/check";
import { findInternalLinkIssues } from "#nakafa-content/link/internal";
import { findMalformedLatexCommandIssues } from "#nakafa-content/math/command";
import { findDisplayedMathCompositionIssues } from "#nakafa-content/math/compose";
import { findPlainMathLabelIssues } from "#nakafa-content/math/label";
import { findMathStackIssues } from "#nakafa-content/math/stack";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { findMathBlockFragmentIssues } from "#nakafa-content/voice/fragment";
import { findForbiddenControlCharacterIssue } from "#nakafa-content/voice/heading";
import { documentProfile } from "#nakafa-content/voice/profile";
import { findLearnerFacingSemicolonIssues } from "#nakafa-content/voice/punctuation";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Applies structural checks to assessed prompts and authored voice to explanations. */
export function findDocumentIssues(
  file: string,
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode
) {
  const profile = documentProfile(file);
  const structural = [
    ...findMathStackIssues(source, tree),
    ...findExternalLinkPlacementIssues(source, tree),
    ...findInternalLinkIssues(source, tree),
    ...findHighlightNestingIssues(source, tree),
    ...findHighlightVariantIssues(source, tree),
    ...findExactLineSmoothingIssues(source, tree),
  ];
  if (profile === "question") {
    return [
      ...structural,
      ...source.split("\n").flatMap((line, index) => {
        const issue = findForbiddenControlCharacterIssue(line);
        return issue ? [{ ...issue, line: index + 1 }] : [];
      }),
      ...findEmphasisArtifactIssues(source, tree),
      ...findPlainMathLabelIssues(source, tree),
      ...findMalformedLatexCommandIssues(source, tree),
      ...findDisplayedMathCompositionIssues(source, tree),
    ];
  }
  if (profile === "article") {
    return [
      ...structural,
      ...findLessonVoiceIssues(locale, source, tree, undefined, "article"),
      ...findPhraseEmphasisIssues(source, tree),
      ...findMathBlockFragmentIssues(source, tree),
      ...findHeadingOrderIssues(source, tree, 2),
    ];
  }
  return [
    ...structural,
    ...findLessonVoiceIssues(
      locale,
      source,
      tree,
      profile === "answer" ? "answer" : undefined
    ),
    ...findPhraseEmphasisIssues(source, tree),
    ...findBodyHighlightIssues(tree, profile === "answer"),
    ...findMathBlockFragmentIssues(source, tree),
    ...findLearnerFacingSemicolonIssues(source, tree),
    ...findHeadingOrderIssues(
      source,
      tree,
      profile === "answer" ? 4 : 2,
      profile === "answer" ? undefined : locale
    ),
    ...(profile === "answer"
      ? []
      : [
          ...findOpeningHighlightIssues(source, tree),
          ...findExerciseAnswerIssues(source, tree, locale),
        ]),
  ];
}
