import { GERMAN_FORMAL_ADDRESS_PATTERN } from "#nakafa-content/voice/address";
import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks stiff lesson choreography and personified instructional prose. */
export const FLOW_VOICE_RULES = [
  {
    id: "abrupt-scenario-imperative",
    patterns: {
      de: /\b(?:angenommen|stell dir vor)\b[^.!?\n]{0,180}\bGrundstück\b[^.!?\n]*[.!?]\s+(?:Nähere|Schätze|Berechne)\b[^.!?\n]{0,50}\bFläche\b/iu,
      en: /\b(?:suppose|imagine)\b[^.!?\n]{0,180}\b(?:plot|piece) of land\b[^.!?\n]*[.!?]\s+(?:Approximate|Estimate|Calculate)\b[^.!?\n]{0,50}\b(?:area|land)\b/iu,
      id: /\b(?:misalkan|bayangkan)\b[^.!?\n]{0,180}\b(?:tanah|lahan)\b[^.!?\n]*[.!?]\s+(?:Perkirakan|Hitung)\b[^.!?\n]{0,50}\b(?:luas|tanah|lahan)\b/iu,
    },
  },
  {
    id: "irrelevant-fiction-label",
    patterns: {
      de: /^(?!\s*>)(?:\s*\d+\.\s+)?(?:In dieser fiktiven Aufgabe\b|Das fiktive Modell\b|Eine hypothetische (?:Region hat|Substanz beginnt)|Ein hypothetisches (?:Medikament|Unternehmen)\b)/iu,
      en: /^(?!\s*>)(?:\s*\d+\.\s+)?(?:In this fictional exercise\b|The fictional model\b|A hypothetical (?:company|region|substance)\b|Suppose a hypothetical medicine\b|Consider a hypothetical company\b)/iu,
      id: /^(?!\s*>)(?:\s*\d+\.\s+)?(?:Dalam latihan fiktif ini\b|Model fiktif ini\b|Suatu (?:wilayah|zat) hipotetis\b|Anggap (?:sebuah perusahaan|suatu obat) hipotetis\b)/iu,
    },
  },
  {
    id: "indonesian-trailing-bare-range",
    patterns: {
      id: /\b(?:sebagai|berupa|menjadi) rentang[.!?](?:\s|$)/iu,
    },
  },
  {
    id: "indonesian-uncertainty-propagation-calque",
    patterns: {
      id: /(?:\b(?:ketidakpastian|pengukuran|data ukur)\b[^.!?\n]{0,100}\baturan rambatan\b|\baturan rambatan\b[^.!?\n]{0,100}\b(?:ketidakpastian|pengukuran|data ukur)\b)/iu,
    },
  },
  {
    id: "indonesian-detached-discussion-passive",
    patterns: {
      id: /\b(?:ketika|saat)\b[^.!?\n]{0,100}\bikut dibahas\b/iu,
    },
  },
  {
    id: "indonesian-meta-discussion-classification",
    patterns: {
      id: /\bdibahas (?:sebagai|dalam konteks)\b/iu,
    },
  },
  {
    id: "abstract-concept-question-personification",
    patterns: {
      de: /(?:\b(?:ein Grenzwert|der Grenzwert|Identifizierbarkeit|Atomökonomie|grüne Chemie|bedingte Wahrscheinlichkeit|Atomradius|erste Ionisierungsenergie|Elektronenaffinität|Elektronegativität)\b|die\s+`str\(\)`\s+Funktion)[^.!?\n]{0,180}\bfragt\b/iu,
      en: /(?:\b(?:a limit|the limit|identifiability|atom economy|green chemistry|conditional probability|atomic radius|first ionization energy|electron affinity|electronegativity)\b|the\s+`str\(\)`\s+function)[^.!?\n]{0,180}\basks?\b/iu,
      id: /(?:\b(?:limit|identifiabilitas|ekonomi atom|kimia hijau|peluang bersyarat|jari-jari atom|energi ionisasi pertama|afinitas elektron|keelektronegatifan)\b|fungsi\s+`str\(\)`)[^.!?\n]{0,180}\b(?:bertanya|menanyakan|meminta)\b/iu,
    },
  },
  {
    id: "empty-example-preface",
    patterns: {
      de: /\bum (?:dieses|das) Konzept besser zu verstehen,?\s+(?:betrachte|sieh dir)\s+(?:einige|die folgenden) Beispiele?\b/iu,
      en: /\bto better understand (?:this|the) concept,?\s+(?:look at|consider)\s+(?:some|the following) examples?\b/iu,
      id: /\buntuk lebih memahami konsep ini,?\s+(?:lihat|perhatikan)\s+(?:beberapa contoh|contoh berikut)\b/iu,
    },
  },
  {
    id: "unsupported-evaluative-preface",
    patterns: {
      de: /\bdies ist das häufigste Beispiel[.!?]?\s*$/iu,
      en: /\bthis is (?:the )?most common example[.!?]?\s*$/iu,
      id: /(?:\bpertanyaan menarik\s*:|\b(?:ini adalah )?contoh paling umum[.!?]?\s*$)/iu,
    },
  },
  {
    id: "german-formal-address",
    inspectLinkLabels: true,
    patterns: {
      de: GERMAN_FORMAL_ADDRESS_PATTERN,
    },
    protectInlineQuotations: true,
  },
  {
    id: "decorative-code-metaphor",
    patterns: {
      de: /\b(?:Werkzeuge? in (?:einem|dem) Werkzeugkasten|Operatoren\b[^.!?\n]{0,60}\bwie Werkzeuge|wie ein Reißverschluss)\b/iu,
      en: /\b(?:tools? in (?:a|the) toolbox|operators?\b[^.!?\n]{0,60}\blike tools|like a zipper)\b/iu,
      id: /\b(?:alat di dalam kotak perkakas|operator\b[^.!?\n]{0,60}\bseperti alat|seperti resleting)\b/iu,
    },
  },
  {
    id: "stock-usefulness-transition",
    patterns: {
      de: /\b(?:genau )?deshalb ist\b[^.!?\n]{0,100}\bnützlich\b/iu,
      en: /\bthat is why\b[^.!?\n]{0,100}\buseful\b/iu,
      id: /\bitulah alasan\b[^.!?\n]{0,100}\bberguna\b/iu,
    },
  },
  {
    id: "generic-more-direct-way",
    patterns: {
      de: /\bdirekter geht es mit\b/iu,
      en: /\banother more direct way is to use\b/iu,
      id: /\bcara lain yang lebih langsung adalah dengan menggunakan\b/iu,
    },
  },
  {
    id: "empty-learning-invitation",
    patterns: {
      de: /\b(?:schauen|sehen) wir uns\b/iu,
      en: /\b(?:let's|let us) (?:look|see|explore|examine|try)\b/iu,
      id: /\b(?:mari|ayo|yuk) (?:kita )?(?:lihat|melihat|simak|coba|mencoba|pelajari)\b/iu,
    },
  },
  {
    id: "empty-lesson-choreography",
    patterns: {
      de: /\b(?:nun betrachten wir|betrachten wir nun|wenden wir (?:nun )?(?:dieses Konzept|diesen Test|den Test|dieselbe Regel)\b[^.!?\n]{0,80}\ban|nun folgen einige|im Mittelpunkt stehen hier|das folgende Beispiel zeigt das vollständige Vorgehen)\b/iu,
      en: /\b(?:now consider|now look at|here we focus on|apply (?:this|the) (?:concept|test|method|rule|identity) to (?:an?|the) example|learn some basic|look at a simple example to understand the process|the following example shows the complete procedure)\b/iu,
      id: /\b(?:sekarang perhatikan|sekarang lihat|di sini kita akan (?:melihat|membahas|mempelajari)|terapkan (?:ini|(?:konsep|uji|tes|metode|aturan|identitas) ini) pada (?:sebuah )?contoh|mari belajar|lihat contoh sederhana untuk memahami prosesnya|lihat bagaimana caranya dengan contoh)\b/iu,
    },
  },
  {
    id: "stock-rhetorical-opener",
    patterns: {
      de: /^\s*(?:Was (?:(?:aber|ist nun|geschieht),\s*)?wenn|Hast du (?:jemals|schon))\b/iu,
      en: /^\s*(?:(?:But|Now)\s+)?(?:What if|Have you ever)\b/iu,
      id: /^\s*(?:Namun,\s*)?(?:Bagaimana jika|Pernahkah)\b/iu,
    },
  },
  {
    id: "rhetorical-not-only",
    patterns: {
      de: /\bnicht (?:bloß|lediglich|nur)(?=\s|[.,!?]|$)/iu,
      en: /\b(?:more than just|not (?:just|merely|only))(?=\s|[.,!?]|$)/iu,
      id: /\b(?:bukan|tidak) (?:cuma|hanya|sekadar)(?!\s+(?:dekorasi|formalitas|hiasan|notasi\b))(?=\s|[.,!?]|$)/iu,
    },
  },
  {
    id: "empty-usefulness-question",
    patterns: {
      de: /(?:^\s*Warum ist (?:das|dies) (?:nützlich|wichtig)\?|^#{2,5}\s+(?:Warum (?:ist|sind) .+ (?:nützlich|wichtig)|Wozu (?:dient|dienen) .+)\s*$)/iu,
      en: /(?:^\s*Why (?:is this useful|does this matter)\?|^#{2,5}\s+(?:Why (?:Is|Are) .+ (?:Useful|Important)|Why Does .+ Matter)\s*$)/iu,
      id: /(?:^\s*(?:Mengapa|Kenapa) ini (?:berguna|penting)\?|^#{2,5}\s+(?:Mengapa|Kenapa) .+ (?:Berguna|Penting)\s*$)/iu,
    },
  },
  {
    id: "formulaic-instructional-personification",
    patterns: {
      de: /\b(?:diese[rs]?\s+)?(?:Tabelle|Vergleich|Beispiel|Modell|Formel|Prozess|Beziehung)\b[^.!?\n]{0,80}\b(?:lehrt|lädt)\s+(?:uns|dich)\b/iu,
      en: /\b(?:this\s+)?(?:table|comparison|example|model|formula|process|relationship)\b[^.!?\n]{0,80}\b(?:teaches|invites)\s+(?:us|you)\b/iu,
      id: /\b(?:tabel|perbandingan|contoh|model|rumus|proses|hubungan)(?:\s+ini)?\b[^.!?\n]{0,80}\b(?:mengajarkan|mengajak)\s+(?:kita|kamu|cara)\b/iu,
    },
  },
  {
    id: "vague-interpretive-label",
    patterns: {
      de: /\b(?:chemische Lektüre|was die Chemie liest|Chemie liest)\b/iu,
      en: /\b(?:what chemistry reads|chemistry reading|read the connection)\b/iu,
      id: /\b(?:yang dibaca dari kimia|bacaan kimianya|baca(?:lah)? hubungan(?:nya)?|hubungan(?:nya)? (?:bisa )?dibaca)\b/iu,
    },
  },
  {
    id: "vague-visibility-endpoint",
    patterns: {
      de: /\bbis\b[^.!?\n]{0,120}\b(?:sichtbar|erkennbar|klar)\s+(?:ist|sind|werden)\b/iu,
      en: /\buntil\b[^.!?\n]{0,120}\b(?:visible|clear|recognizable)\b/iu,
      id: /\b(?:sampai|hingga)\b[^.!?\n]{0,120}\b(?:terlihat|tampak|jelas|dapat dikenali)\b/iu,
    },
  },
  {
    id: "metawriting-disclaimer",
    patterns: {
      de: /\bdiese Tabelle ist keine\b[^.!?\n]{0,80}\b(?:Merk|Lern)liste\b/iu,
      en: /\bthis table is not\b[^.!?\n]{0,80}\b(?:memorization|memory|study) list\b/iu,
      id: /\btabel (?:ini|itu|tersebut) bukan\b[^.!?\n]{0,80}\b(?:hafalan|daftar hafalan)\b/iu,
    },
  },
  {
    id: "vague-heading-sensory",
    patterns: {
      de: /^#{2,6}[ \t]+[^\n]*(?:fühlt sich|auf einen Blick|bleibt klar)\b/iu,
      en: /^#{2,6}[ \t]+[^\n]*(?:feels?|makes more sense|at a glance|stays clear)\b/iu,
      id: /^#{2,6}[ \t]+[^\n]*(?:terasa|lebih masuk akal|secara ringkas)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
