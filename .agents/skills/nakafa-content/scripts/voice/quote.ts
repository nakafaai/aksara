import type { MdxNode } from "#nakafa-content/mdx/parse";
import { visitMdxNodes } from "#nakafa-content/mdx/parse";
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
      de: /^\s*(?:Kurzer Check|Kurze Kontrolle|Kurz geprüft|Schnellcheck|Merke(?: dir)?|Merkregel|Merksatz|Wichtiger Hinweis|Hinweis|Wichtig|Achtung|Vorsicht|Warnung|Tipps?|Kernidee|Kernkonzept|Schlüsselkonzept|Kurzfassung|Zusammenfassung|Fazit|Notiz)\s*:/iu,
      en: /^\s*(?:Quick check|Quick test|Checkpoint|Key concept|Key idea|Key point|Key takeaway|Key rule|Core idea|Core concept|Important note|Note|Remember(?: that)?|Keep in mind|Pro tip|Quick tip|Tips?|Warning|Caution|Watch out|Important|Summary|Takeaway|Bottom line)\s*:/iu,
      id: /^\s*(?:Cek cepat|Periksa cepat|Pemeriksaan cepat|Ingat(?: bahwa)?|Perlu diingat|Konsep kunci|Konsep penting|Ide kunci|Ide utama|Catatan penting|Catatan|Tips?|Kiat|Ringkasan|Rangkuman|Inti(?:nya)?|Perhatian|Peringatan|Waspada|Penting|Fakta penting|Kunci)\s*:/iu,
      ms: /^\s*(?:Semakan pantas|Semak pantas|Semakan cepat|Semak cepat|Ingat(?: bahawa)?|Perlu diingat|Konsep kunci|Konsep utama|Konsep penting|Idea utama|Idea kunci|Nota penting|Nota|Catatan|Tips?|Petua|Ringkasan|Rumusan|Inti(?:nya)?|Perhatian|Amaran|Penting|Kunci)\s*:/iu,
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
