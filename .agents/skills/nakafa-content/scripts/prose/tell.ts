import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Narrow machine-writing artifacts that are invalid in every authored role. */
export const AI_ARTIFACT_RULES = [
  {
    id: "chatbot-artifact",
    patterns: {
      de: /\b(?:Ich hoffe,? das hilft|Bei weiteren Fragen|gern(e)? wieder|meldet euch einfach)\b/iu,
      en: /\b(?:Certainly!|Great question!|I hope this helps|let me know if|feel free to ask)\b/iu,
      id: /\b(?:Tentu saja!|Pertanyaan bagus!|Semoga ini membantu|kabari aku jika|jangan ragu bertanya)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "knowledge-cutoff-disclaimer",
    patterns: {
      de: /\b(?:als (?:mein|unser) letztes Update|meines Wissens nach|ich habe keinen Zugriff auf|solange die Details begrenzt sind)\b/iu,
      en: /\b(?:as of (?:my|our) last update|while specific details are limited|I (?:do not|don't) have access to)\b/iu,
      id: /\b(?:hingga pembaruan terakhir|sepengetahuanku|sepengetahuan saya|selama rinciannya terbatas|aku tidak memiliki akses ke)\b/iu,
    },
    protectInlineQuotations: true,
  },
] satisfies readonly LessonVoiceRule[];

/** Probabilistic writing tells kept as review candidates, never word bans. */
export const AI_STYLE_RULES = [
  {
    id: "stacked-hedge",
    patterns: {
      de: /\b(?:könnte|dürfte)\s+(?:möglicherweise|potenziell|eventuell)\b/iu,
      en: /\b(?:may|might|could)\s+(?:possibly|potentially|perhaps|arguably)\b/iu,
      id: /\b(?:mungkin|barangkali)\s+(?:mungkin|barangkali)|\bkemungkinan\s+(?:mungkin|barangkali)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "significance-inflation",
    patterns: {
      de: /\b(?:steht als (?:Beweis|Zeugnis)|markiert einen (?:bedeutsamen|wesentlichen) Wandel|(?:bleibt|ist) ein dauerhaftes Vermächtnis)\b/iu,
      en: /\b(?:stands? as (?:a )?(?:testament|tribute)|marks? a significant shift|enduring legacy)\b/iu,
      id: /\b(?:menandai perubahan (?:penting|signifikan)|meninggalkan warisan yang (?:abadi|langgeng))\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "vague-significance-tail",
    patterns: {
      de: /\b(?:hervorhebend|unterstreichend|zeigend)\s+(?:seine|ihre|die)\s+(?:Bedeutung|Wichtigkeit|Relevanz)\b/iu,
      en: /\b(?:highlighting|underscoring|showcasing|emphasizing|reflecting)\s+(?:its|their|the)\s+(?:importance|significance|relevance|value)\b/iu,
      id: /\b(?:menonjolkan|menunjukkan|menegaskan|mencerminkan)\s+(?:pentingnya|relevansinya|nilainya)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "generic-upbeat-conclusion",
    patterns: {
      de: /\b(?:die Zukunft sieht (?:hell|rosig) aus|die Möglichkeiten sind unbegrenzt|aufregende Zeiten stehen bevor)\b/iu,
      en: /\b(?:the future (?:looks|is) bright|the possibilities are endless|exciting times (?:are|lie) ahead)\b/iu,
      id: /\b(?:masa depan (?:terlihat|tampak) cerah|peluang(?:nya)? (?:tak terbatas|tanpa batas)|waktu yang menarik di depan)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "cliche-challenges-outcome",
    patterns: {
      de: /\btrotz (?:dieser|aller|der) Herausforderungen\b[^.!?\n]{0,120}\b(?:gedeiht|blüht|kommt voran|bleibt widerstandsfähig)\b/iu,
      en: /\bdespite (?:these|all|the) challenges\b[^.!?\n]{0,120}\b(?:continues? to thrive|thrives?|moves? forward|remains? resilient)\b/iu,
      id: /\bmeskipun (?:berbagai )?tantangan\b[^.!?\n]{0,120}\b(?:tetap berkembang|terus berkembang|tetap bertahan|terus maju)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "cliche-balanced-conclusion",
    patterns: {
      de: /\b(?:letztlich kommt es darauf an|es gibt keine pauschale Lösung|beides hat seine Vorzüge)\b/iu,
      en: /\b(?:ultimately,? it depends|there is no one[- ]size[- ]fits[- ]all|both have their merits)\b/iu,
      id: /\b(?:pada akhirnya,? (?:semuanya )?tergantung|tidak ada satu (?:cara|solusi) yang cocok untuk semua|keduanya memiliki (?:kelebihan|nilai))\b/iu,
    },
    protectInlineQuotations: true,
  },
] satisfies readonly LessonVoiceRule[];
