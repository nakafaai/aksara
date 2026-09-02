import { linkDefinitions, linkUrl } from "#nakafa-content/link-reference";
import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/voice-mdx";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
  LessonVoiceRule,
} from "#nakafa-content/voice-types";

/** Checks prose that points at a link instead of naming its source. */
export const NAVIGATION_VOICE_RULES = [
  {
    id: "source-navigation-filler",
    patterns: {
      de: /\b(?:Quelle|Referenz|Zusammenfassung|Seite|Bericht|Biografie)\b[^.!?\n]{0,60}\b(?:kann (?:über|unter) .+ (?:geöffnet|aufgerufen) werden|ist (?:über|unter) .+ verfügbar)\b/iu,
      en: /\b(?:source|reference|summary|page|report|biography|press release)\b(?:,? which)? (?:can be opened (?:at|through|via)|is available (?:at|through|via))\b/iu,
      id: /\b(?:sumber|rujukan|ringkasan|halaman|laporan|berita|keterangan|siaran pers)(?:nya| tersebut)?\b[^.!?\n]{0,60}\b(?:dapat|bisa) (?:dibuka|diakses) (?:di|melalui|pada)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];

const EXTERNAL_URL_PATTERN = /^https?:\/\//iu;
const DIGIT_PATTERN = /\d/u;
const SENTENCE_END_PATTERN = /[.!?]["'’”)\]}]*$/u;
const TERMINAL_ABBREVIATION_PATTERN =
  /(?:\b(?:[a-z]\.){2,}|\b(?:dll|dr|dsb|etc|hlm|mis|no|prof|usw)\.)["'’”)\]}]*$/iu;
const SENTENCE_START_PATTERN = /^[*_~"'‘“„([]*(?:[\p{Lu}\p{N}]|<|`)/u;
const WHITESPACE_PATTERN = /\s+/u;
const PUNCTUATION_ONLY_PATTERN = /^[.!?]+$/u;
const SENTENCE_LEADING_PUNCTUATION_PATTERN = /^[.!?]["'’”)\]}]*\s+/u;

const PLACEHOLDER_LABEL_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:dieser link|quellenlink)$/iu,
  en: /^(?:click here|read more|source link|this link|this source link)$/iu,
  id: /^(?:tautan ini|tautan sumber)$/iu,
};

const REPORTING_VERB_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /\b(?:erreichte|meldete)\b/iu,
  en: /\b(?:reached|reported)\b/iu,
  id: /\b(?:dilaporkan|melaporkan|mencapai)\b/iu,
};

const GENERIC_DESCRIPTION_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:(?:primäre strukturstudie in|wissenschaftliche übersichtsarbeit (?:über|zu))\b|(?:[\p{L}\p{N}.+-]+[ -])?dokumentation$)/iu,
  en: /^(?:(?:peer-reviewed review of|primary structural study in)\b|(?:official )?documentation(?: (?:for|of) [\p{L}\p{N}.+-]+)?$|[\p{L}\p{N}.+-]+ documentation$)/iu,
  id: /^(?:(?:studi struktur primer di|ulasan ilmiah tentang)\b|dokumentasi(?: resmi)?(?: [\p{L}\p{N}.+-]+)?$)/iu,
};

const TOPIC_LABEL_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:atom|chemisches element|ethanol|größenwert|kapsaicin|katalysator|messung|molekül)$/iu,
  en: /^(?:atom|capsaicin|catalyst|chemical element|ethanol|measurement|molecule|quantity value)$/iu,
  id: /^(?:atom|etanol|kapsaisin|katalis|molekul|nilai besaran|pengukuran|unsur kimia)$/iu,
};

/** Returns the learner-visible plain label of one Markdown link. */
function linkLabel(node: MdxNode): string {
  const parts: string[] = [];
  visitMdxNodes(node, (child) => {
    if (
      (child.type === "text" || child.type === "inlineCode") &&
      typeof child.value === "string"
    ) {
      parts.push(child.value);
    }
  });
  return parts.join(" ").replace(/\s+/gu, " ").trim();
}

/** Counts space-separated words without treating punctuation as extra words. */
function wordCount(label: string): number {
  return label.split(WHITESPACE_PATTERN).filter(Boolean).length;
}

/** Removes external-link source spans while keeping the surrounding prose. */
function proseWithoutExternalLinks(
  node: MdxNode,
  source: string,
  startOffset: number,
  endOffset: number,
  definitions: ReadonlyMap<string, string>
): string {
  const ranges: Array<{ end: number; start: number }> = [];
  visitMdxNodes(node, (child) => {
    const start = child.position?.start?.offset;
    const end = child.position?.end?.offset;
    const url = linkUrl(child, definitions);
    if (
      url === undefined ||
      !EXTERNAL_URL_PATTERN.test(url) ||
      start === undefined ||
      end === undefined ||
      start < startOffset ||
      end > endOffset
    ) {
      return;
    }
    ranges.push({ end, start });
  });
  ranges.sort((left, right) => left.start - right.start);

  let cursor = startOffset;
  let result = "";
  for (const range of ranges) {
    result += source.slice(cursor, range.start);
    cursor = range.end;
  }
  return result + source.slice(cursor, endOffset);
}

/** Returns the nearest prose block that owns one inline link. */
function proseContainer(ancestors: readonly MdxNode[]): MdxNode | undefined {
  for (let index = ancestors.length - 1; index >= 0; index -= 1) {
    const ancestor = ancestors[index];
    if (
      ancestor &&
      (ancestor.type === "paragraph" || ancestor.type === "tableCell")
    ) {
      return ancestor;
    }
  }
}

/** Distinguishes a new sentence after a citation from continued link grammar. */
function continuesSentenceAfterLink(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed === "" || PUNCTUATION_ONLY_PATTERN.test(trimmed)) {
    return false;
  }
  const withoutClosingPunctuation = trimmed.replace(
    SENTENCE_LEADING_PUNCTUATION_PATTERN,
    ""
  );
  return !SENTENCE_START_PATTERN.test(withoutClosingPunctuation);
}

/** Rejects an abbreviation dot as evidence that the source follows a claim. */
function followsCompleteSentence(value: string): boolean {
  return (
    SENTENCE_END_PATTERN.test(value) &&
    !TERMINAL_ABBREVIATION_PATTERN.test(value)
  );
}

/** Traverses MDX with ancestors so placement can inspect prose containers. */
function visitWithAncestors(
  node: MdxNode,
  ancestors: readonly MdxNode[],
  visit: (current: MdxNode, parents: readonly MdxNode[]) => void
): void {
  visit(node, ancestors);
  for (const child of node.children ?? []) {
    visitWithAncestors(child, [...ancestors, node], visit);
  }
}

/** Returns the narrow evidence-backed failure for one external label. */
function externalLinkRule(
  locale: LessonVoiceLocale,
  label: string
): string | undefined {
  if (PLACEHOLDER_LABEL_PATTERNS[locale].test(label)) {
    return "external-link-placeholder-label";
  }
  if (
    wordCount(label) >= 8 &&
    DIGIT_PATTERN.test(label) &&
    REPORTING_VERB_PATTERNS[locale].test(label)
  ) {
    return "external-link-claim-label";
  }
  if (GENERIC_DESCRIPTION_PATTERNS[locale].test(label)) {
    return "external-link-generic-description";
  }
  if (TOPIC_LABEL_PATTERNS[locale].test(label)) {
    return "external-link-topic-label";
  }
  return undefined;
}

/** Finds external chips whose label is prose or a lesson topic, not a source. */
export function findExternalLinkLabelIssues(
  locale: LessonVoiceLocale,
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  const definitions = linkDefinitions(tree);
  visitWithAncestors(tree, [], (node, ancestors) => {
    if (ancestors.some(({ type }) => type === "blockquote")) {
      return;
    }
    const url = linkUrl(node, definitions);
    if (url === undefined || !EXTERNAL_URL_PATTERN.test(url)) {
      return;
    }
    const label = linkLabel(node);
    const rule = externalLinkRule(locale, label);
    const start = node.position?.start;
    if (
      rule === undefined ||
      start?.line === undefined ||
      start.column === undefined
    ) {
      return;
    }
    const line = source.split("\n")[start.line - 1] ?? "";
    issues.push({
      column: start.column,
      excerpt: line.trim(),
      line: start.line,
      rule,
    });
  });
  return issues;
}

/** Finds source chips used as grammatical parts of learner-facing prose. */
export function findExternalLinkPlacementIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  const definitions = linkDefinitions(tree);
  visitWithAncestors(tree, [], (node, ancestors) => {
    if (ancestors.some(({ type }) => type === "blockquote")) {
      return;
    }
    const url = linkUrl(node, definitions);
    if (url === undefined || !EXTERNAL_URL_PATTERN.test(url)) {
      return;
    }
    const container = proseContainer(ancestors);
    const containerStart = container?.position?.start?.offset;
    const containerEnd = container?.position?.end?.offset;
    const linkStart = node.position?.start?.offset;
    const linkEnd = node.position?.end?.offset;
    const start = node.position?.start;
    if (
      container === undefined ||
      containerStart === undefined ||
      containerEnd === undefined ||
      linkStart === undefined ||
      linkEnd === undefined ||
      start?.line === undefined ||
      start.column === undefined
    ) {
      return;
    }

    const before = proseWithoutExternalLinks(
      container,
      source,
      containerStart,
      linkStart,
      definitions
    ).trim();
    const after = proseWithoutExternalLinks(
      container,
      source,
      linkEnd,
      containerEnd,
      definitions
    );
    const isStandaloneCitation =
      before === "" &&
      (after.trim() === "" || PUNCTUATION_ONLY_PATTERN.test(after.trim()));
    const followsCompleteClaim = followsCompleteSentence(before);
    if (
      isStandaloneCitation ||
      (followsCompleteClaim && !continuesSentenceAfterLink(after))
    ) {
      return;
    }

    const line = source.split("\n")[start.line - 1] ?? "";
    issues.push({
      column: start.column,
      excerpt: line.trim(),
      line: start.line,
      rule: "external-link-chip-in-sentence",
    });
  });
  return issues;
}
