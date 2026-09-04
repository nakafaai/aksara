import { isHttpsUrl } from "@nakafa/aksara-contracts/text/syntax";
import { isExternalDestination } from "#nakafa-content/link/destination";
import { jsxDestinationOffsets } from "#nakafa-content/link/jsx";
import { linkDefinitions, linkUrl } from "#nakafa-content/link/reference";
import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type {
  LessonVoiceIssue,
  LessonVoiceRule,
} from "#nakafa-content/voice/types";

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

/** Accepts one HTTPS Markdown link, never an image or JSX escape. */
function isHttpsMarkdownLink(node: MdxNode, destination: string): boolean {
  return (
    (node.type === "link" || node.type === "linkReference") &&
    isHttpsUrl(destination)
  );
}

/** Returns one placement issue at an exact source offset. */
function issueAtOffset(source: string, offset: number): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line: source.slice(0, lineStart).split("\n").length,
    rule: "external-link-invalid-placement",
  };
}

/** Blocks non-HTTPS links and external images or JSX destinations. */
export function findExternalLinkPlacementIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  const definitions = linkDefinitions(tree);
  const lines = source.split("\n");
  visitMdxNodes(tree, (node) => {
    const url = linkUrl(node, definitions);
    const start = node.position?.start;
    if (
      url !== undefined &&
      isExternalDestination(url) &&
      !isHttpsMarkdownLink(node, url) &&
      start?.line !== undefined &&
      start.column !== undefined
    ) {
      issues.push({
        column: start.column,
        excerpt: (lines[start.line - 1] ?? "").trim(),
        line: start.line,
        rule: "external-link-invalid-placement",
      });
    }
    issues.push(
      ...jsxDestinationOffsets(node, source).map((offset) =>
        issueAtOffset(source, offset)
      )
    );
  });
  return issues;
}
