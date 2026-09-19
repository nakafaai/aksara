import { basename } from "node:path";
import { QuestionBodyKindSchema } from "@nakafa/aksara-contracts/question/identity";
import { Schema } from "effect";
import { findEmphasisArtifactIssues } from "#nakafa-content/emphasis/check";
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
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { findMathBlockFragmentIssues } from "#nakafa-content/voice/fragment";
import { findLearnerFacingSemicolonIssues } from "#nakafa-content/voice/punctuation";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Reads the contract-owned body role without mixing prompts and explanations. */
export function questionBodyKind(file: string) {
  const stem = basename(file, ".mdx");
  const kind = stem.slice(0, stem.lastIndexOf("."));
  return Schema.is(QuestionBodyKindSchema)(kind) ? kind : undefined;
}

/** Applies structural checks to assessed prompts and authored voice to explanations. */
export function findDocumentIssues(
  file: string,
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode
) {
  const kind = questionBodyKind(file);
  const structural = [
    ...findExternalLinkPlacementIssues(source, tree),
    ...findInternalLinkIssues(source, tree),
    ...findHighlightNestingIssues(source, tree),
    ...findHighlightVariantIssues(source, tree),
    ...findExactLineSmoothingIssues(source, tree),
  ];
  if (kind === "question") {
    return [
      ...structural,
      ...findEmphasisArtifactIssues(source, tree),
      ...findPlainMathLabelIssues(source, tree),
      ...findMalformedLatexCommandIssues(source, tree),
      ...findDisplayedMathCompositionIssues(source, tree),
    ];
  }
  return [
    ...structural,
    ...findLessonVoiceIssues(locale, source, tree, kind),
    ...findMathBlockFragmentIssues(source, tree),
    ...findLearnerFacingSemicolonIssues(source, tree),
    ...findHeadingOrderIssues(source, tree, kind === "answer" ? 4 : 2),
    ...(kind === "answer" ? [] : [...findOpeningHighlightIssues(source, tree)]),
  ];
}
