import { type MdxNode, visitMdxNodes } from "#nakafa-content/mdx/parse";
import { renderedNodeRange } from "#nakafa-content/mdx/rendered";
import { matchRangeRules } from "#nakafa-content/voice/match";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice/types";

/** Blocks editorial labels that delay the actual message of a blockquote. */
const BLOCKQUOTE_VOICE_RULES = [
  {
    id: "blockquote-editorial-label",
    patterns: {
      de: /^\s*(?:Kurzer Check|Kurze Kontrolle|Kurz geprüft|Schnellcheck)\s*:/iu,
      en: /^\s*(?:Quick check|Quick test|Checkpoint)\s*:/iu,
      id: /^\s*(?:Cek cepat|Periksa cepat|Pemeriksaan cepat)\s*:/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];

/** Finds editorial labels only at the start of authored blockquotes. */
export function findBlockquoteEditorialLabelIssues(
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  visitMdxNodes(tree, (node) => {
    if (node.type === "blockquote") {
      issues.push(
        ...matchRangeRules(
          locale,
          source,
          renderedNodeRange(node, source),
          BLOCKQUOTE_VOICE_RULES
        )
      );
    }
  });
  return issues;
}
