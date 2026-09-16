import { linkDefinitions, linkUrl } from "#nakafa-content/link/reference";
import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import { renderedNodeRange } from "#nakafa-content/mdx/rendered";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** Matches a same-site destination. A protocol-relative `//host` stays external. */
const INTERNAL_DESTINATION_PATTERN = /^\/(?!\/)/u;
const WHITESPACE_PATTERN = /\s+/gu;
const TRAILING_PUNCTUATION_PATTERN = /[:.,!?]+$/u;
const WORD_PATTERN = /[\p{L}\p{N}]/u;
const LINK_NODE_TYPES = new Set(["link", "linkReference"]);

type PositionedNode = MdxNode & {
  position: { start: { column: number; line: number } };
};

/**
 * Labels that name no destination concept. A learner who reads one of these
 * learns nothing about where the link leads, so the sentence must carry the
 * concept name instead.
 */
const GENERIC_LINK_LABELS = new Set([
  "artikel ini",
  "baca di sini",
  "baca selengkapnya",
  "di sini",
  "diese seite",
  "dieser link",
  "halaman ini",
  "here",
  "hier",
  "hier klicken",
  "informasi lebih lanjut",
  "klick hier",
  "klik",
  "klik di sini",
  "learn more",
  "lebih lanjut",
  "lihat di sini",
  "lihat selengkapnya",
  "link",
  "link ini",
  "mehr dazu",
  "mehr erfahren",
  "mehr informationen",
  "pelajari lebih lanjut",
  "read more",
  "see here",
  "selengkapnya",
  "tautan",
  "tautan berikut",
  "tautan berikutnya",
  "tautan ini",
  "this link",
  "this page",
  "weiterlesen",
]);

/**
 * Headings whose whole label only announces navigation. A heading must teach a
 * concept, so a section that exists to collect links names nothing.
 */
const NAVIGATION_HEADING_LABELS = new Set([
  "artikel terkait",
  "baca juga",
  "das könnte dich auch interessieren",
  "lanjutkan membaca",
  "lihat juga",
  "materi terkait",
  "mehr dazu",
  "pelajari juga",
  "related",
  "related lessons",
  "related topics",
  "see also",
  "siehe auch",
  "tautan terkait",
  "topik terkait",
  "verwandte themen",
  "weiterlesen",
  "ähnliche themen",
]);

/** Returns one stable normalized label for lookup in the label sets. */
function normalizeLabel(text: string): string {
  return text
    .replace(WHITESPACE_PATTERN, " ")
    .trim()
    .toLowerCase()
    .replace(TRAILING_PUNCTUATION_PATTERN, "")
    .trim();
}

/** Narrows one parsed node to a resolved source position. */
function isPositioned(node: MdxNode): node is PositionedNode {
  return (
    typeof node.position?.start?.line === "number" &&
    typeof node.position.start.column === "number"
  );
}

/** Returns true only for an authored same-site Markdown destination. */
export function isInternalDestination(destination: string): boolean {
  return INTERNAL_DESTINATION_PATTERN.test(destination);
}

/** Returns true when a label names no destination concept. */
function namesNoConcept(label: string): boolean {
  return label === "" || GENERIC_LINK_LABELS.has(label);
}

/** Reads the rendered, normalized label text of one Markdown node. */
function renderedLabel(node: MdxNode, source: string): string {
  return normalizeLabel(renderedNodeRange(node, source)?.rendered?.text ?? "");
}

/** Builds one issue at a parsed node's opening position. */
function issueAt(
  node: PositionedNode,
  rule: string,
  source: string
): LessonVoiceIssue {
  const { column, line } = node.position.start;
  return {
    column,
    excerpt: (source.split("\n")[line - 1] ?? "").trim(),
    line,
    rule,
  };
}

interface BlockScan {
  internalLinks: number;
  otherContent: boolean;
  residualWords: boolean;
}

/**
 * Measures one block's content. Text outside an internal link is residual
 * prose, while inline code, an image, math, or a component already carries its
 * own meaning, so such a block never counts as link-only.
 */
function scanBlock(
  node: MdxNode,
  source: string,
  definitions: ReadonlyMap<string, string>,
  insideLink: boolean,
  scan: BlockScan
): void {
  if (
    node.type === "inlineCode" ||
    node.type === "image" ||
    node.type === "imageReference" ||
    node.type === "mdxJsxFlowElement" ||
    node.type === "mdxJsxTextElement"
  ) {
    scan.otherContent = true;
    return;
  }
  if (node.type === "break") {
    return;
  }
  if (LINK_NODE_TYPES.has(node.type)) {
    const url = linkUrl(node, definitions);
    if (url !== undefined && isInternalDestination(url)) {
      if (namesNoConcept(renderedLabel(node, source))) {
        scan.otherContent = true;
        return;
      }
      scan.internalLinks += 1;
      return;
    }
  }
  if (!insideLink && node.type === "text") {
    if (WORD_PATTERN.test(typeof node.value === "string" ? node.value : "")) {
      scan.residualWords = true;
    }
    return;
  }
  const nested = insideLink || LINK_NODE_TYPES.has(node.type);
  for (const child of node.children ?? []) {
    scanBlock(child, source, definitions, nested, scan);
  }
}

/** Reports a paragraph whose visible content is only internal links. */
function collectBlockIssue(
  node: PositionedNode,
  definitions: ReadonlyMap<string, string>,
  source: string,
  issues: LessonVoiceIssue[]
): void {
  const scan: BlockScan = {
    internalLinks: 0,
    otherContent: false,
    residualWords: false,
  };
  for (const child of node.children ?? []) {
    scanBlock(child, source, definitions, false, scan);
  }
  if (scan.internalLinks > 0 && !(scan.otherContent || scan.residualWords)) {
    issues.push(issueAt(node, "internal-link-only-block", source));
  }
}

/**
 * Finds internal links that name nothing, blocks that carry only links, and
 * headings that only announce navigation. External destinations keep their own
 * `external-link-invalid-placement` rule and stay untouched here.
 */
export function findInternalLinkIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const definitions = linkDefinitions(tree);
  const issues: LessonVoiceIssue[] = [];
  visitMdxNodes(tree, (node) => {
    if (node.type === "heading" && isPositioned(node)) {
      if (NAVIGATION_HEADING_LABELS.has(renderedLabel(node, source))) {
        issues.push(issueAt(node, "internal-link-navigation-heading", source));
      }
      return;
    }
    if (LINK_NODE_TYPES.has(node.type) && isPositioned(node)) {
      const url = linkUrl(node, definitions);
      if (
        url !== undefined &&
        isInternalDestination(url) &&
        namesNoConcept(renderedLabel(node, source))
      ) {
        issues.push(issueAt(node, "internal-link-generic-label", source));
      }
      return;
    }
    if (node.type === "paragraph" && isPositioned(node)) {
      collectBlockIssue(node, definitions, source, issues);
    }
  });
  return issues;
}
