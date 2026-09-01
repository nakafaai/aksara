import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks empty importance labels and unsupported claims about utility. */
export const CLAIM_VOICE_RULES = [
  {
    id: "vague-surprising-result",
    patterns: {
      de: /\b(?:Das )?Ergebnis\b[^.!?\n]{0,20}überraschend\b/iu,
      en: /\b(?:the )?result\b[^.!?\n]{0,20}\b(?:more )?surprising\b/iu,
      id: /\bhasil(?:nya)?\b[^.!?\n]{0,20}\b(?:lebih )?mengejutkan\b/iu,
    },
  },
  {
    id: "inflated-relationship-intro",
    patterns: {
      de: /\b(?:sehr interessante|besonders wichtige) (?:Beziehung|Zusammenhang)\b/iu,
      en: /\b(?:very interesting|especially important) relationship\b/iu,
      id: /\bhubungan yang (?:sangat menarik|sangat penting|begitu penting)\b/iu,
    },
  },
  {
    id: "inflated-utility-claim",
    patterns: {
      de: /\b(?:sehr (?:nützlich|hilfreich)|(?:hat|haben|spielt|spielen) (?:ein(?:e|en)? )?(?:wichtige|entscheidende|zentrale)(?:n|r)? Rolle)\b/iu,
      en: /\b(?:very (?:useful|helpful)|(?:has|have|plays?) (?:an?|the) (?:important|central|crucial|essential|vital) role)\b/iu,
      id: /\b(?:sangat (?:berguna|membantu)|berperan (?:sangat )?penting|(?:memiliki|mempunyai|memainkan) peran (?:penting|utama|sentral))\b/iu,
    },
  },
  {
    id: "generic-bare-utility-label",
    patterns: {
      de: /\b(?:Diese Tatsachen sind|Das ist) nützlich\b/iu,
      en: /\b(?:This (?:form|way) is|These facts are) useful\b/iu,
      id: /\b(?:Cara|Fakta) ini berguna\b/iu,
    },
  },
  {
    id: "empty-big-idea-label",
    patterns: {
      de: /\b(?:(?:große|zentrale) Ideen?|zwei zentrale Vorgänge)\b/iu,
      en: /\b(?:big|central|main|major) ideas?\b/iu,
      id: /\b(?:gagasan|ide) (?:besar|utama)\b/iu,
    },
  },
  {
    id: "inflated-causative-utility",
    patterns: {
      de: /\bmach(?:t|en|te|ten)\b[^.!?\n]{0,120}\b(?:brauchbar|leistungsfähig|nutzbar|nützlich|wertvoll|wichtig|zentral(?:e[nrsm]?)?)\b/iu,
      en: /\b(?:make|makes|made)\b[^.!?\n]{0,120}\b(?:central|important|powerful|useful|valuable)\b/iu,
      id: /\b(?:membuat|menjadikan)\b[^.!?\n]{0,120}\b(?:berguna|bermanfaat|kuat|penting|sentral|utama)\b/iu,
    },
  },
  {
    id: "importance-before-cause",
    patterns: {
      de: /\b(?:ist|sind|war|waren)\s+(?:besonders\s+|weiterhin\s+)?(?:entscheidend|wichtig),?\s+(?:da|weil)\b/iu,
      en: /\b(?:(?:is|are|was|were)\s+(?:especially\s+|still\s+)?(?:essential|important)\s+because|(?:[\p{L}-]+\s+matters|(?:these|those|they)\s+matter)\s+because)\b/iu,
      id: /(?<!angka )\bpenting\s+karena\b/iu,
    },
  },
  {
    id: "empty-evaluative-label",
    patterns: {
      de: /\b(?:sehr wichtig(?:e|en|er|es)?|wichtiges Konzept|wichtige (?:Chemikalie|Eigenschaft|Eigenschaften|Konsequenz)|wichtige[nrsm]? Ausgangspunkt|(?:ein|eine|einen|zwei|drei|vier|mehrere|viele|einige) wichtige[nrsm]?|wichtige[nrsm]? (?:Anwendung|Bedingung|Beispiel|Bestandteil|Definition|Form|Hinweis|Information|Komponente|Merkmal|Punkt|Regel|Verwendung|Vorteil|Zweck)|interessante Eigenschaften|elegante Blockform|bemerkenswert enge)\b/iu,
      en: /\b(?:very important|important (?:advantage|application|characteristic|chemical|component|concept|condition|consequence|definition|difference|element|form|information|note|part|point|properties|property|purpose|relationship|result|rule|setting|starting point|type|use)|(?:one|two|three|four|several|many|some|more) important|interesting (?:pattern|properties|result|results)|elegant block form|most intuitive way|remarkably tight)\b/iu,
      id: /\b(?:sangat penting|konsep penting|konsekuensi penting|perbedaan penting|sifat penting|sifat-sifat penting|hasil penting|awal yang penting|(?:satu|dua|tiga|empat|beberapa|banyak) (?:hal )?penting|(?:aplikasi|bagian|bahan kimia|catatan|poin|komponen|unsur|penerapan|hubungan|bentuk|jenis|tujuan|contoh|definisi|aturan|syarat|karakteristik|kelebihan|keunggulan|kegunaan|informasi) penting|(?:hal|pola|sifat|hasil) yang menarik|bentuk blok yang elegan|cara paling intuitif)\b/iu,
    },
  },
  {
    id: "generic-attention-label",
    patterns: {
      de: /^\s*\*\*Wichtig:\*\*/iu,
      en: /^\s*\*\*Important:\*\*/iu,
      id: /^\s*\*\*Penting:\*\*/iu,
    },
  },
  {
    id: "generic-effective-opener",
    patterns: {
      de: /^\s*(?:Wirksame|Effektive) Prävention beginnt\b/iu,
      en: /^\s*Effective prevention starts\b/iu,
      id: /^\s*Pencegahan (?:yang )?efektif dimulai\b/iu,
    },
  },
  {
    id: "generic-analysis-utility",
    patterns: {
      de: /\b(?:ist|sind) für die Analyse nützlich\b/iu,
      en: /\b(?:is|are) useful for analysis\b/iu,
      id: /\bberguna untuk analisis\b/iu,
    },
  },
  {
    id: "generic-practical-method",
    patterns: {
      de: /\b(?:gibt|liefert|bietet)\s+(?:eine\s+)?praktische Methode\b/iu,
      en: /\b(?:gives?|provides?|offers?)\s+(?:a\s+)?practical method\b/iu,
      id: /\b(?:memberi(?:kan)?|menyediakan|menawarkan)\s+(?:sebuah\s+)?metode praktis\b/iu,
    },
  },
  {
    id: "formulaic-direct-way-provider",
    patterns: {
      de: /\b(?:Gleichung|Formel|Identität|Methode)\b[^.!?\n]{0,80}\b(?:gibt|liefert|bietet)\b\s+(?!(?:uns|dir)\b)[^.!?\n]{0,30}\bdirekte[nrsm]? (?:Möglichkeit|Weg)\b/iu,
      en: /\b(?:equation|formula|identity|method)\b[^.!?\n]{0,80}\b(?:gives?|provides?|offers?)\b\s+(?!(?:us|you)\b)[^.!?\n]{0,30}\b(?:a\s+)?direct way\b/iu,
      id: /\b(?:persamaan|rumus|identitas|metode)\b[^.!?\n]{0,80}\b(?:memberi(?:kan)?|menyediakan|menawarkan)\b\s+(?!(?:kita|kamu)\b)[^.!?\n]{0,30}\bcara langsung\b/iu,
    },
  },
  {
    id: "inflated-fundamental-label",
    patterns: {
      de: /\b(?:grundlegend(?:e|en|er|es) (?:Beziehung|Eigenschaft|Operation|Proportion|Unterschied)|am grundlegendsten)\b/iu,
      en: /\b(?:fundamental (?:difference|identity|operation|properties?|proportion|relationship)|most fundamental|one of the most fundamental)\b/iu,
      id: /\b(?:(?:hubungan|identitas|operasi|perbandingan|sifat)(?: yang)? (?:paling )?fundamental|(?:perbandingan|sifat) fundamental|teorema fundamental(?! aljabar))\b/iu,
    },
  },
  {
    id: "inflated-robust-label",
    patterns: {
      de: /\brobuste[nrsm]? (?:Diagnosen?|Lösungen?|Methoden?|Verfahren|Werkzeuge?)\b/iu,
      en: /\brobust (?:diagnostics?|methods?|solutions?|solvers?|tools?)\b/iu,
      id: /\b(?:diagnostik|metode|solusi|alat) (?:yang )?(?:andal|kuat|kukuh|tangguh)\b/iu,
    },
  },
  {
    id: "inflated-flexibility-claim",
    patterns: {
      de: /\b(?:ist sehr flexibel im|die Fähigkeit\b[^.!?\n]{0,100}\bmacht es sehr flexibel|ist wertvoll, weil|besonders nützlich, wenn)\b/iu,
      en: /\b(?:is very flexible in|the ability of\b[^.!?\n]{0,100}\bmakes? it very flexible|is valuable because)\b/iu,
      id: /\b(?:sangat fleksibel dalam|kemampuan\b[^.!?\n]{0,100}\bmembuatnya sangat fleksibel|bermanfaat ketika)\b/iu,
    },
  },
  {
    id: "generic-effective-choice",
    patterns: {
      de: /\b(?:wird|ist) (?:zu )?(?:(?:eine|einer) )?(?:wirksame[nr]?|effektive[nr]?) (?:Wahl|Methode|Lösung)\b/iu,
      en: /\b(?:becomes?|is) an? effective (?:choice|method|solution|way|tool)\b/iu,
      id: /\b(?:menjadi|merupakan) (?:pilihan|cara|metode|solusi) yang efektif\b/iu,
    },
  },
  {
    id: "generic-metadata-learning-command",
    patterns: {
      de: /^\s*(?:description:\s*)?"(?:Entdecke|Erfahre|Erfahren Sie|Erkunde|Erkunden Sie|Lerne|Lernen Sie|Untersuche|Verstehe)\b/iu,
      en: /^\s*(?:description:\s*)?"(?:Discover|Explore|Learn|Understand)\b/iu,
      id: /^\s*(?:description:\s*)?"(?:Jelajahi|Pahami|Pelajari|Temukan)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
