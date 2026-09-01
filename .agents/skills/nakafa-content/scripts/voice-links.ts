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
const WHITESPACE_PATTERN = /\s+/u;

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
  visitMdxNodes(tree, (node) => {
    if (
      node.type !== "link" ||
      typeof node.url !== "string" ||
      !EXTERNAL_URL_PATTERN.test(node.url)
    ) {
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
