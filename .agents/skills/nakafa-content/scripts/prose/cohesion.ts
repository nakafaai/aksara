import { HashSet, Predicate } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { MdxAttribute, MdxNode } from "#nakafa-content/mdx/parse";
import {
  attributeEstree,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import {
  FIGURE_SET,
  findFlowFindings,
  flattenFlow,
  visibleProse,
} from "#nakafa-content/prose/flow";
import { maskBalancedQuotations } from "#nakafa-content/voice/text";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Paragraphs above this visible word count ask for a readability review. */
export const REVIEW_PARAGRAPH_WORDS = 60;
/** Paragraphs above this visible word count block as walls of text. */
export const BLOCK_PARAGRAPH_WORDS = 85;

const WORD_PATTERN = /[\p{L}\p{N}]+/gu;
const VISUAL_TEXT_PROPS = HashSet.make("description", "footer", "title");

/**
 * Unit-scaling workaround hacks that force learners into mental unit conversion
 * instead of plotting true values on a proper axis (Rule 16).
 */
const UNIT_SCALING_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /\b(?:in\s+(?:Zehnern|Hundertern|Tausendern)|in\s+Einheiten\s+von\s+\d+|ein\s+(?:senkrechtes\s+|waagerechtes\s+)?Kästchen\s+entspricht\s+\d+|durch\s+\d+\s+geteilt,\s+damit)\b/iu,
  en: /\b(?:in\s+(?:tens|hundreds|thousands)\s+of|in\s+units\s+of\s+\d+|one\s+(?:vertical\s+|horizontal\s+)?grid\s+(?:square|unit|step)\s+(?:equals|represents)\s+\d+|scaled\s+down\s+by\s+\d+|divided\s+by\s+\d+\s+to\s+fit)\b/iu,
  id: /\b(?:dalam\s+(?:puluhan|ratusan|ribuan)|dalam\s+satuan\s+\d+|satu\s+kotak\s+(?:tegak\s+|mendatar\s+|vertikal\s+|horizontal\s+)?(?:pada\s+grafik\s+)?bernilai\s+\d+|skala\s+sumbu\s+\w+\s+dibagi\s+\d+|dibagi\s+\d+\s+agar\s+muat)\b/iu,
  ms: /\b(?:dalam\s+(?:puluhan|ratusan|ribuan)|dalam\s+unit\s+\d+|satu\s+(?:petak|kotak)\s+(?:menegak\s+|melintang\s+|tegak\s+|mendatar\s+)?(?:pada\s+graf\s+)?bernilai\s+\d+|skala\s+paksi\s+\w+\s+dibahagi\s+\d+|dibahagi\s+\d+\s+supaya\s+muat)\b/iu,
};

/**
 * Stiff textbook connectors that break warm teacher voice across the four
 * locales (Rules 12 and 16).
 */
const STIFF_FORMAL_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /\b(?:es\s+ist\s+festzuhalten,?\s+dass|hierbei\s+handelt\s+es\s+sich\s+um|man\s+beachte,?\s+dass|im\s+Rahmen\s+dessen|diesbezüglich|somit\s+lässt\s+sich\s+festhalten)\b/iu,
  en: /\b(?:it\s+should\s+be\s+noted\s+that|it\s+is\s+worth\s+noting\s+that|one\s+must|the\s+reader\s+should|aforementioned|hereby|thus\s+it\s+can\s+be\s+concluded\s+that)\b/iu,
  id: /\b(?:tersebut|merupakan|yakni|adapun|dengan\s+demikian|oleh\s+karena\s+itu|sehubungan\s+dengan\s+itu|berdasarkan\s+hal\s+tersebut|perlu\s+diketahui\s+bahwa|dapat\s+disimpulkan\s+bahwa)\b/iu,
  ms: /\b(?:tersebut|merupakan|yakni|adapun|oleh\s+yang\s+demikian|oleh\s+kerana\s+itu|sehubungan\s+dengan\s+itu|berdasarkan\s+perkara\s+tersebut|dapat\s+dirumuskan\s+bahawa|perlu\s+diingat\s+bahawa)\b/iu,
};

/** Counts visible authored words in one text fragment. */
function countWords(text: string): number {
  return text.match(WORD_PATTERN)?.length ?? 0;
}

/** Reads visible prose inside a JSX text attribute (`title`, `description`, `footer`). */
function visualAttributeText(attribute: MdxAttribute): string {
  if (Predicate.isString(attribute.value)) {
    return attribute.value;
  }
  const estree = attributeEstree(attribute);
  if (estree === undefined) {
    return "";
  }
  let text = "";
  walkEstreeDeep(estree, (node) => {
    if (node.type === "JSXText" && Predicate.isString(node.value)) {
      text = `${text} ${node.value}`;
    }
  });
  return text;
}

/** Checks word density, unit-scaling workarounds, and stiff phrasing in one paragraph. */
function paragraphFindings(
  node: MdxNode,
  line: number,
  scalePattern: RegExp,
  formalPattern: RegExp
): HeadingFinding[] {
  const findings: HeadingFinding[] = [];
  const unquoted = maskBalancedQuotations(visibleProse(node));
  const words = countWords(unquoted);
  if (words > BLOCK_PARAGRAPH_WORDS) {
    findings.push({
      blocking: true,
      line,
      message: `This paragraph has ${words} words (hard cap ${BLOCK_PARAGRAPH_WORDS}). Split it into shorter steps or move the comparison into a formula, table, or visual.`,
      rule: "wall-of-text",
    });
  } else if (words > REVIEW_PARAGRAPH_WORDS) {
    findings.push({
      blocking: false,
      line,
      message: `This paragraph has ${words} words (target <= ${REVIEW_PARAGRAPH_WORDS}). Check whether splitting it makes the reasoning easier to follow on a phone.`,
      rule: "wall-of-text",
    });
  }
  const scaleMatch = scalePattern.exec(unquoted);
  if (scaleMatch !== null) {
    findings.push({
      blocking: true,
      line,
      message: `Avoid axis-scaling workaround '${scaleMatch[0]}'. Plot true physical or mathematical units directly so learners never convert grid units in their head.`,
      rule: "unit-scaling-hack",
    });
  }
  const formalMatch = formalPattern.exec(unquoted);
  if (formalMatch !== null) {
    findings.push({
      blocking: true,
      line,
      message: `Replace stiff textbook wording '${formalMatch[0]}' with direct teacher voice.`,
      rule: "stiff-formal-prose",
    });
  }
  return findings;
}

/** Tells whether an MDX node is a catalog visual figure element. */
function isFigureElement(node: MdxNode): boolean {
  return (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    Predicate.isString(node.name) &&
    HashSet.has(FIGURE_SET, node.name)
  );
}

/** Checks `title`, `description`, and `footer` props of one visual for unit-scaling hacks. */
function visualAttributeFindings(
  node: MdxNode,
  line: number,
  scalePattern: RegExp
): HeadingFinding[] {
  const findings: HeadingFinding[] = [];
  for (const attribute of node.attributes ?? []) {
    if (!HashSet.has(VISUAL_TEXT_PROPS, attribute.name)) {
      continue;
    }
    const text = maskBalancedQuotations(visualAttributeText(attribute));
    const match = scalePattern.exec(text);
    if (match !== null) {
      findings.push({
        blocking: true,
        line: attribute.position?.start?.line ?? line,
        message: `<${node.name}> ${attribute.name} uses axis-scaling workaround '${match[0]}'. Plot true units directly instead of scaling axis numbers.`,
        rule: "unit-scaling-hack",
      });
    }
  }
  return findings;
}

/** Checks paragraph readability, stiff textbook phrasing, and axis-scaling workaround hacks. */
function findProseCohesionFindings(
  locale: LessonVoiceLocale,
  tree: MdxNode
): HeadingFinding[] {
  const findings: HeadingFinding[] = [];
  const scalePattern = UNIT_SCALING_PATTERNS[locale];
  const formalPattern = STIFF_FORMAL_PATTERNS[locale];

  visitMdxNodes(tree, (node) => {
    const line = node.position?.start?.line ?? 1;
    if (node.type === "paragraph") {
      findings.push(
        ...paragraphFindings(node, line, scalePattern, formalPattern)
      );
      return;
    }
    if (isFigureElement(node)) {
      findings.push(...visualAttributeFindings(node, line, scalePattern));
    }
  });
  return findings;
}

/**
 * Enforces Rule 16 cohesion and readability on one lesson page:
 * - Every visual has lead-in prose before it and takeaway prose after it.
 * - No back-to-back visuals with zero bridging prose.
 * - No displayed formula dumped directly under a heading without plain intuition.
 * - No dangling colons followed by another plain paragraph.
 * - No axis-scaling workaround hacks in prose or visual text.
 * - No stiff textbook connectors (`tersebut`, `merupakan`, `yakni`, `adapun`, etc.).
 * - No dense walls of text (> 60 words review, > 85 words blocking).
 */
export function findCohesionFindings(
  locale: LessonVoiceLocale,
  tree: MdxNode
): HeadingFinding[] {
  const blocks = flattenFlow(tree.children ?? []);
  return [
    ...findFlowFindings(blocks),
    ...findProseCohesionFindings(locale, tree),
  ];
}
