import { Array as Arr, HashSet, Predicate } from "effect";
import { ANSWER_HEADINGS } from "#nakafa-content/heading/answer";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { visitMdxNodes } from "#nakafa-content/mdx/parse";
import { visibleProse } from "#nakafa-content/prose/flow";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const DISPLAY_MATH_COMPONENTS = HashSet.make("BlockMath", "MathContainer");

/**
 * Boilerplate phrases that avoid naming the concrete final answer inside the
 * `# Jawaban` / `# Answer` / `# Antwort` / `# Jawapan` section.
 */
const VAGUE_FINAL_ANSWER_PATTERNS: Readonly<Record<LessonVoiceLocale, RegExp>> =
  {
    de: /\b(?:gesuchte\s+Endergebnis|ergibt\s+sich\s+unmittelbar\s+das\s+gesuchte|wie\s+oben\s+gezeigt|die\s+Lösung\s+ergibt\s+sich\s+aus\s+den\s+obigen\s+Schritten)\b/iu,
    en: /\b(?:final\s+answer\s+requested\s+by\s+the\s+problem|combining\s+all\s+the\s+steps\s+above\s+gives\s+the\s+final\s+answer|yields\s+the\s+final\s+answer|answer\s+follows\s+from\s+the\s+steps\s+above|as\s+shown\s+above)\b/iu,
    id: /\b(?:hasil\s+akhir\s+yang\s+sesuai\s+dengan\s+pertanyaan\s+soal|diperoleh\s+hasil\s+akhir\s+yang\s+sesuai|menggabungkan\s+seluruh\s+langkah\s+di\s+atas,\s+diperoleh\s+hasil\s+akhir|jawaban\s+akhir\s+sesuai\s+langkah\s+di\s+atas|sesuai\s+dengan\s+hasil\s+di\s+atas)\b/iu,
    ms: /\b(?:hasil\s+akhir\s+yang\s+sesuai\s+dengan\s+soalan|jawapan\s+akhir\s+seperti\s+di\s+atas|menggabungkan\s+semua\s+langkah\s+di\s+atas)\b/iu,
  };

/** Checks whether one node subtree contains bold emphasis or display math. */
function nodeHasHighlight(node: MdxNode): boolean {
  let highlighted = false;
  visitMdxNodes(node, (current) => {
    if (highlighted) {
      return;
    }
    if (current.type === "strong") {
      highlighted = true;
      return;
    }
    if (
      (current.type === "mdxJsxFlowElement" ||
        current.type === "mdxJsxTextElement") &&
      Predicate.isString(current.name) &&
      HashSet.has(DISPLAY_MATH_COMPONENTS, current.name)
    ) {
      highlighted = true;
    }
  });
  return highlighted;
}

/** Checks whether any section body node contains bold emphasis or display math. */
function hasFinalAnswerHighlight(nodes: readonly MdxNode[]): boolean {
  return Arr.some(nodes, nodeHasHighlight);
}

/** Collects each final-answer heading section (`# Jawaban` / `## Jawaban`) and its body nodes. */
function collectFinalAnswerSections(
  locale: LessonVoiceLocale,
  tree: MdxNode,
  isParts: boolean
): readonly { readonly body: readonly MdxNode[]; readonly line: number }[] {
  const [, , , answerHeading] = ANSWER_HEADINGS[locale];
  const targetDepth = isParts ? 2 : 1;
  const sections: { body: MdxNode[]; line: number }[] = [];
  let active: { body: MdxNode[]; line: number } | undefined;

  for (const child of tree.children ?? []) {
    if (child.type === "heading") {
      const depth = child.depth ?? 0;
      const label = visibleProse(child).trim();
      if (depth <= targetDepth) {
        active = undefined;
      }
      if (depth === targetDepth && label === answerHeading) {
        active = { body: [], line: child.position?.start?.line ?? 1 };
        sections.push(active);
      }
      continue;
    }
    if (active !== undefined) {
      active.body.push(child);
    }
  }
  return sections;
}

/**
 * Enforces that every `# Jawaban` / `# Answer` / `# Antwort` / `# Jawapan`
 * section states a concrete, highlighted final answer and never falls back to
 * vague copy-paste boilerplate.
 */
export function findFinalAnswerQualityFindings(
  locale: LessonVoiceLocale,
  tree: MdxNode,
  isParts: boolean
): HeadingFinding[] {
  const sections = collectFinalAnswerSections(locale, tree, isParts);
  const vaguePattern = VAGUE_FINAL_ANSWER_PATTERNS[locale];
  const findings: HeadingFinding[] = [];

  for (const { body, line } of sections) {
    const prose = Arr.join(Arr.map(body, visibleProse), " ").trim();
    const vagueMatch = vaguePattern.exec(prose);
    if (vagueMatch !== null) {
      findings.push({
        blocking: true,
        line,
        message: `Final answer section uses vague boilerplate '${vagueMatch[0]}'. State the exact concrete answer (value, equation, option, or truth values) and highlight it.`,
        rule: "vague-final-answer",
      });
    }
    if (!hasFinalAnswerHighlight(body)) {
      findings.push({
        blocking: true,
        line,
        message:
          "Final answer section must highlight the concrete final answer with bold emphasis (**...**) or a display <BlockMath /> block.",
        rule: "answer-missing-highlight",
      });
    }
  }
  return findings;
}
