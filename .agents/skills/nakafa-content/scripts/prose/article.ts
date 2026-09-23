import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/**
 * Blocks an article claim that names an authority only as `research` or
 * `experts`. A named author, institution, study, decision, or inline source
 * remains valid because it gives the reader a checkable provenance anchor.
 */
export const ARTICLE_EVIDENCE_RULES = [
  {
    id: "article-vague-attribution",
    patterns: {
      de: /\b(?:Studien|Forschung|Forscher|Experten|Kritiker|Beobachter|Wissenschaftler)\s+(?:zeigen|deuten|legen|sagen|argumentieren|haben festgestellt|belegen|bestätigen|glauben|behaupten)\b/iu,
      en: /\b(?:studies|research|researchers?|experts?|critics|observers|scientists)\s+(?:say|says|show|shows|suggest|suggests|argue|argues|have noted|indicate|indicates|believe|believes|claim|claims|prove|proves|confirm|confirms)\b/iu,
      id: /\b(?:studi|penelitian|para ahli|pengamat|kritikus|ilmuwan)\s+(?:menunjukkan|membuktikan|menyatakan|mengatakan|berpendapat|mencatat|meyakini|mengklaim|mengonfirmasi)\b/iu,
    },
    protectInlineQuotations: true,
  },
] satisfies readonly LessonVoiceRule[];
