import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks stock transitions and unsupported procedural comparisons. */
export const TRANSITION_VOICE_RULES = [
  {
    id: "generic-easiest-way-claim",
    patterns: {
      de: /\b(?:der (?:einfachste|schnellste) Weg|die (?:einfachste|schnellste) Möglichkeit|am einfachsten|am schnellsten zum Ziel|am übersichtlichsten|(?:einer der )?praktischste[nr]? Wege?)\b/iu,
      en: /\b(?:the )?(?:easiest|fastest|quickest|simplest|most basic|most practical) ways?\b/iu,
      id: /\b(?:(?:salah satu )?cara paling (?:cepat|dasar|mudah|praktis|sederhana)|cara tercepat)\b/iu,
    },
  },
  {
    id: "formulaic-good-news-transition",
    patterns: {
      de: /\bdie gute Nachricht ist\b/iu,
      en: /\bthe good news is\b/iu,
      id: /\bkabar baiknya\b/iu,
    },
  },
  {
    id: "formulaic-key-claim",
    patterns: {
      de: /\b(?:der Schlüssel (?:zur|zum|zu|liegt|bleibt die)|das entscheidende Merkmal|das Schlüsselwort lautet|Schlüssel(?:konzept|idee|faktor|prinzip))\b/iu,
      en: /\b(?:the key (?:characteristic|idea|point|word is)|the main key|the key is to|key (?:concept|difference|factor|idea|point|principle|step|takeaway))\b/iu,
      id: /\b(?:kunci utama|kata kuncinya|kata pentingnya adalah|konsep kunci|gagasan kunci|poin kunci|langkah kunci|perbedaan kunci|faktor kunci|prinsip kunci)\b|\bkuncinya(?:\s+adalah\b|,)/iu,
    },
  },
  {
    id: "inflated-foundation-claim",
    patterns: {
      de: /\b(?:die wichtigste Grundlage|solide theoretische Grundlage|(?:bildet|ist) (?:die|eine) Grundlage für|(?:diese Idee|dieses Konzept) bildet die Grundlage (?:der|des|von))\b/iu,
      en: /\b(?:the key result for|(?:basic|important|solid theoretical) foundation|(?:is|are|forms?|serves? as) (?:a|the) foundation for|(?:this idea|this concept) is the foundation of)\b/iu,
      id: /\b(?:dasar terpenting|teorema paling mendasar|fondasi (?:dasar|penting|teoretis(?: yang)? solid)|(?:menjadi|merupakan) (?:dasar|fondasi|landasan) untuk|(?:gagasan|konsep) ini menjadi (?:dasar|landasan)\b)/iu,
    },
  },
  {
    id: "formulaic-gateway-transition",
    patterns: {
      de: /(?:öffnet|oeffnet)[^.!?\n]{0,60}(?:die\s+)?Tür\s+(?:zu|zur|zum)\b/iu,
      en: /\b(?:opens?\b[^.!?\n]{0,60}\b(?:the\s+)?door|gateway|entry point)\s+(?:to|into)\b/iu,
      id: /\b(?:pintu masuk|membuka jalan)\s+(?:ke|menuju|bagi)\b/iu,
    },
  },
  {
    id: "vague-procedural-improvement",
    patterns: {
      de: /\bmach(?:t|en)\s+(?:die\s+|den\s+|das\s+)?(?:Rechnung|Schritt|Vorgehen|Ausgabe|System|Bedeutung)\s+(?:leichter|sicherer|übersichtlicher|klarer|lesbarer)\b/iu,
      en: /\bmakes?\s+(?:the\s+|this\s+)?(?:calculation|step|method|approach|operation|output|system|meaning)\s+(?:easier|safer|cleaner|clearer|more (?:organized|readable|understandable))\b/iu,
      id: /\bmembuat\s+(?:langkah|cara|metode|pendekatan|perhitungan|operasi|keluaran|output|sistem|makna)(?:nya)?\s+(?:lebih\s+)?(?:mudah(?:\s+(?:dibaca|dipahami))?|aman|rapi|jelas)\b/iu,
    },
  },
  {
    id: "vague-procedural-path",
    patterns: {
      de: /\bliefert\s+(?:sowohl\s+)?(?:einen\s+)?Test\s+(?:als auch|und)\s+(?:einen\s+)?(?:effizienten|schnellen)\s+Weg\b/iu,
      en: /\b(?:give|gives|provide|provides)\s+(?:both\s+)?(?:a\s+)?test\s+(?:and|as well as)\s+(?:an?\s+)?(?:efficient|fast)\s+(?:path|route)\b/iu,
      id: /\bmemberi(?:kan)?\s+(?:sebuah\s+)?uji\s+(?:sekaligus|dan)\s+(?:sebuah\s+)?jalur\s+(?:yang\s+)?(?:cepat|efisien)\b/iu,
    },
  },
  {
    id: "abstract-efficiency-path",
    patterns: {
      de: /\b(?:bietet|bieten|gibt es)\b[^.!?\n]{0,80}\b(?:effizientere[nrsm]?|schnellere[nrsm]?)\s+Wege?\b/iu,
      en: /\b(?:offer|offers|provide|provides)\b[^.!?\n]{0,80}\b(?:more\s+)?(?:efficient|faster)\s+(?:paths?|routes?)\b/iu,
      id: /\b(?:memberi(?:kan)?|menawarkan|menyediakan)\b(?![^.!?\n]{0,80}\buji\b)[^.!?\n]{0,80}\bjalur\s+(?:yang\s+)?(?:lebih\s+)?(?:cepat|efisien)\b/iu,
    },
  },
  {
    id: "vague-visual-method",
    patterns: {
      de: /\b(?:bietet|liefert)\s+(?:eine\s+)?visuelle\s+(?:Methode|Möglichkeit|Vorgehensweise)\b/iu,
      en: /\b(?:give|gives|provide|provides)\s+(?:a\s+)?visual\s+(?:method|way)\b/iu,
      id: /\bmemberi(?:kan)?\s+(?:sebuah\s+)?cara\s+visual\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
