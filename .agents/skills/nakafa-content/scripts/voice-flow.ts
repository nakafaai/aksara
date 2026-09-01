import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks stiff lesson choreography and personified instructional prose. */
export const FLOW_VOICE_RULES = [
  {
    id: "german-formal-address",
    patterns: {
      de: /(?:\b(?:[Aa]chten|[Aa]ddieren|[Bb]earbeiten|[Bb]eachten|[Bb]egründen|[Bb]erechnen|[Bb]estimmen|[Bb]etrachten|[Bb]ewegen|[Bb]eweisen|[Ee]rfahren|[Ee]rkunden|[Ee]rmitteln|[Ee]rsetzen|[Ee]rstellen|[Ee]rzwingen|[Ff]inden|[Gg]ehen|[Gg]ruppieren|[Hh]alten|[Ii]dentifizieren|[Ii]solieren|[Ll]ernen|[Ll]esen|[Ll]ösen|[Mm]ultiplizieren|[Nn]ehmen|[Nn]otieren|[Nn]utzen|[Pp]rüfen|[Qq]uadrieren|[Ss]chließen|[Ss]ehen|[Ss]etzen|[Ss]kizzieren|[Ss]tellen|[Ss]ubtrahieren|[Tt]eilen|[Tt]ragen|[Üü]berprüfen|[Uu]ntersuchen|[Vv]ereinfachen|[Vv]ergleichen|[Vv]ervollständigen|[Vv]erwenden|[Vv]ersuchen|[Vv]ertauschen|[Ww]ählen|[Ww]enden|[Zz]eichnen|[Zz]eigen) Sie\b|\b(?:[Ff]alls|[Hh]aben|[Kk]önnen|[Mm]öchten|[Mm]üssen|[Ss]ollen|[Ss]ollten|[Ww]enn|[Ww]erden) Sie\b|^\s*Sie (?:dürfen|haben|können|möchten|müssen|sollen|sollten|werden)\b)/u,
    },
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
    id: "formulaic-attention-filler",
    patterns: {
      de: /\b(?:es ist wichtig(?:,\s*sich daran zu erinnern)?|es ist zu beachten|beachte,\s*dass|man sollte beachten|wichtiger,?\s+darauf zu achten)\b/iu,
      en: /\b(?:(?:it is|it's) important to|important to remember|more important to (?:consider|notice|watch)|note that|remember that)\b/iu,
      id: /(?:\b(?:meng)?ingat bahwa|\bperlu (?:dipahami|diketahui|diingat|dicatat)(?: bahwa)?|\blebih penting untuk diperhatikan\b|^\s*(?:(?:sebelum|untuk memahami)[^.!?\n]{0,100},?\s+)?penting untuk (?:memahami|membedakan|menentukan|mengetahui|dipahami|diketahui|diingat)\b)/iu,
    },
  },
  {
    id: "generic-tip-intro",
    patterns: {
      de: /^\s*(?:einige|mehrere)?\s*(?:hilfreiche|nützliche)\s+(?:Hinweise|Kontrollen|Tipps)\s*:/iu,
      en: /^\s*(?:a few|several|some)?\s*(?:helpful|useful)\s+(?:checks|tips)\s*:/iu,
      id: /^\s*beberapa\s+tips?\s+(?:berguna|untuk memudahkan pemahaman)\s*:/iu,
    },
  },
  {
    id: "formulaic-simplification-transition",
    patterns: {
      de: /^\s*(?:der Einfachheit halber|um es einfacher zu machen),?\s+(?:nutzen|verwenden|wählen)\s+wir\b/iu,
      en: /^\s*(?:for convenience|to simplify|to make (?:it|this) easier),?\s+we\s+(?:choose|use)\b/iu,
      id: /^\s*(?:demi kemudahan|untuk memudahkan),?\s+kita\s+(?:gunakan|memakai|pilih)\b/iu,
    },
  },
  {
    id: "vague-abstraction-relief",
    patterns: {
      de: /\b(?:macht|wirkt|werden|wird)\b[^.!?\n]{0,100}\bweniger abstrakt\b|\banschaulich(?:er)?\s+(?:macht|wirkt|werden|wird)\b/iu,
      en: /\b(?:feel|feels|make|makes)\b[^.!?\n]{0,100}\bless abstract\b/iu,
      id: /\b(?:membuat|menjadikan|terasa)\b[^.!?\n]{0,100}\b(?:kurang|tidak terlalu) abstrak\b/iu,
    },
  },
  {
    id: "formulaic-utility-transition",
    patterns: {
      de: /\bhier (?:wird|werden)\b[^.!?\n]{0,80}\b(?:nützlich|wichtig)\b/iu,
      en: /\bthis is where\b[^.!?\n]{0,80}\b(?:becomes? useful|plays? (?:a )?role|comes? in)\b/iu,
      id: /\bdi sinilah\b[^.!?\n]{0,80}\b(?:berguna|berperan|dibutuhkan|digunakan)\b/iu,
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
