import type {
  LessonVoiceIssue,
  LessonVoiceRule,
  LineState,
  SourceIssue,
} from "#nakafa-content/voice-types";

/** Checks generic headings and labels that do not name the lesson task. */
export const HEADING_VOICE_RULES = [
  {
    id: "generic-important-heading",
    patterns: {
      de: /^#{2,6}[ \t]+.*\b(?:wichtig(?:e|en|er|es)?|wichtigst(?:e|en|er|es)?)\b/iu,
      en: /^#{2,6}[ \t]+.*\bimportant\b/iu,
      id: /^#{2,6}[ \t]+(?![^\n]*\bangka penting\b)[^\n]*\bpenting\b/iu,
    },
  },
  {
    id: "generic-importance-heading",
    patterns: {
      de: /^#{2,6}[ \t]+Warum\s+(?!(?:ist|sind)\b)[^\n]*(?:wichtig|nützlich)(?:\s+(?:ist|sind))?\b[ \t]*$/iu,
      en: /^#{2,6}[ \t]+Why\s+(?!(?:is|are|does)\b)[^\n]*(?:matters?|useful|important)\b[ \t]*$/iu,
    },
  },
  {
    id: "generic-importance-table-label",
    patterns: {
      de: /^\|[^\n]*\b(?:Warum (?:das|es|sie) wichtig ist|Wichtige Grenze)\b[^\n]*\|/iu,
      en: /^\|[^\n]*\b(?:Why (?:it|this) matters|Important limit)\b[^\n]*\|/iu,
      id: /^\|[^\n]*\b(?:Mengapa (?:ini )?penting|Mengapa perlu ditanyakan|Batas penting)\b[^\n]*\|/iu,
    },
  },
  {
    id: "generic-everyday-application-heading",
    patterns: {
      de: /^#{2,6}[ \t]+(?:(?:Anwendungen?|Beispiele?)(?: [^\n]+)? (?:im Alltag|im täglichen Leben|in konkreten Situationen)|Beispiele? aus (?:dem Alltag|dem täglichen Leben))[ \t]*$/iu,
      en: /^#{2,6}[ \t]+(?:(?:Applications?|Examples?)(?: of [^\n]+)? in (?:(?:Everyday|Daily|Real) Life|Real Situations)|(?:Everyday|Daily|Real) Life Examples?)[ \t]*$/iu,
      id: /^#{2,6}[ \t]+(?:(?:Aplikasi|Penerapan|Penggunaan|Kegunaan|Contoh)(?: [^\n]+)? (?:dalam )?(?:Kehidupan (?:Sehari hari|Harian|Nyata)|Situasi Nyata)|Contoh Kehidupan Sehari Hari)[ \t]*$/iu,
    },
  },
  {
    id: "generic-application-label",
    patterns: {
      de: /(?:^#{2,6}[ \t]+(?:Praktische Anwendungen|Implementierung in realen Anwendungen)[ \t]*$|^\s*description:\s*"[^"]*\b(?:praktisch(?:e|en|er|es)? Anwendungen|Anwendungen in der realen Welt)\b)/iu,
      en: /(?:^#{2,6}[ \t]+(?:Practical Applications|Implementation in Real Applications)[ \t]*$|^\s*description:\s*"[^"]*\b(?:practical|real world) applications\b)/iu,
      id: /(?:^#{2,6}[ \t]+(?:Aplikasi Praktis|Implementasi dalam Aplikasi Nyata)[ \t]*$|^\s*description:\s*"[^"]*\b(?:aplikasi praktis|aplikasi nyata|penerapan nyata)\b)/iu,
    },
  },
  {
    id: "generic-real-world-label",
    patterns: {
      de: /(?:^#{2,6}[ \t]+[^\n]*\breales? Beispiel\b|\b(?:Beispiele?|Berechnungen?|Probleme?|Situationen?) (?:aus|in) der realen Welt\b)/iu,
      en: /(?:^#{2,6}[ \t]+[^\n]*\bReal Example\b|\breal[- ]world (?:calculations?|examples?|problems?|situations?)\b)/iu,
      id: /(?:^#{2,6}[ \t]+[^\n]*\bContoh Nyata\b|\b(?:masalah|contoh|situasi|perhitungan) dunia nyata\b)/iu,
    },
  },
  {
    id: "generic-example-heading",
    patterns: {
      de: /^#{2,6}[ \t]+(?:Beispiel|Beispiele|Beispielanwendung|Beispielrechnung|Anwendungsbeispiel|Anwendungsbeispiele|Ausführliche Beispiele|Durchgerechnetes Beispiel|Ein konkretes Beispiel|Einfaches Beispiel|Ein kleines durchgerechnetes Beispiel|Ein weiteres Beispiel|Erstes Beispiel|Komplexes Beispiel|Weitere Beispiele|Vollständig durchgerechnetes Beispiel|Vollständig gerechnetes Beispiel|Zweites Beispiel)[ \t]*$/iu,
      en: /^#{2,6}[ \t]+(?:A Concrete Example|Another Example|Application Example|Application Examples|Calculation Example|Calculation Examples|Complete Calculation Example|Complete Solution Examples|Complex Example|Direct Calculation Examples|Example|Examples|Example Application|Example Problems|Expansion Examples|First Example|Further Examples|Second Example|Simple Example|Visualization Example|Worked Example|Worked Examples|Worked Example Under Stated Conditions|Worked Two Dimensional Example|Worked Vector Example|Worked Weighted Example)[ \t]*$/iu,
      id: /^#{2,6}[ \t]+(?:Contoh|Contoh Aplikasi|Contoh Bertahap|Contoh Cepat|Contoh dengan Pembahasan|Contoh dua dimensi|Contoh Kasus|Contoh Kedua|Contoh Kerja|Contoh Kompleks|Contoh Konkret|Contoh Lain|Contoh Pembahasan|Contoh Penerapan|Contoh Pengembangan|Contoh Perhitungan|Contoh Perhitungan dengan Kondisi Tertentu|Contoh Perhitungan Lengkap|Contoh Pertama|Contoh Sederhana|Contoh Soal|Contoh Terurai|Contoh terurai sederhana|Contoh Vektor|Contoh Visualisasi)[ \t]*$/iu,
    },
  },
  {
    id: "generic-section-heading",
    patterns: {
      de: /^#{2,6}[ \t]+(?:Überblick|Einführung|Zusammenfassung|Fazit|Anwendung|Anwendungen|Grundlagen|Konzept|Konzepte|Grundkonzept|Grundlegende Konzepte)[ \t]*$/iu,
      en: /^#{2,6}[ \t]+(?:Overview|Introduction|Summary|Conclusion|Application|Applications|Concept|Concepts|Basic Concept|Basic Concepts)[ \t]*$/iu,
      id: /^#{2,6}[ \t]+(?:Ringkasan|Kesimpulan|Pendahuluan|Penerapan|Aplikasi|Konsep|Konsep Dasar)[ \t]*$/iu,
    },
  },
  {
    id: "generic-calculation-heading",
    patterns: {
      de: /^#{2,6}[ \t]+(?:Berechnungsschritte|Detaillierte Berechnung|Rechenschritte|Lösungsschritte|Systematische Berechnungsschritte)[ \t]*$/iu,
      en: /^#{2,6}[ \t]+(?:Calculation Steps|Detailed Calculation|Solution Steps|Step by Step Calculation|Systematic Calculation Steps)[ \t]*$/iu,
      id: /^#{2,6}[ \t]+(?:Langkah Perhitungan|Langkah Perhitungan Sistematis|Langkah Penyelesaian|Perhitungan Detail|Perhitungan Terperinci)[ \t]*$/iu,
    },
  },
  {
    id: "generic-definition-heading",
    patterns: {
      de: /^#{2,6}[ \t]+Was ist\b/iu,
      en: /^#{2,6}[ \t]+What is\b/iu,
      id: /^#{2,6}[ \t]+Apa itu\b/iu,
    },
  },
  {
    id: "generic-understanding-heading",
    patterns: {
      de: /^#{2,6}[ \t]+(?:Verstehen\b|[^\n]+ verstehen[ \t]*$)/iu,
      en: /^#{2,6}[ \t]+Understanding\b/iu,
      id: /^#{2,6}[ \t]+Memahami\b/iu,
    },
  },
  {
    id: "softened-help-heading",
    patterns: {
      de: /^#{2,6}[ \t]+.*\b(?:hilft|helfen)\b/iu,
      en: /^#{2,6}[ \t]+.*\bhelps?\b/iu,
      id: /^#{2,6}[ \t]+.*\bmembantu\b/iu,
    },
  },
  {
    id: "german-heading-dependent-clause",
    patterns: {
      de: /^#{2,6}[ \t]+(?:(?!(?:Wenn|Bevor|Falls|Obwohl|Nachdem|Warum|Wie|Was|Weshalb|Wozu|Wann|Wo)\b)[^\n]+\b(?:wenn|bevor|weil|obwohl|nachdem|damit|falls)\b|Was\s+(?!ist\b|sind\b)[^\n]+\b(?:ist|sind)\b|(?!(?:Wenn|Bevor|Falls|Obwohl|Nachdem|Warum|Wie|Was|Weshalb|Wozu|Wann|Wo)\b)[^\n]+\b(?:die|der|das)\b[^\n]{0,100}\b(?:ist|sind|wird|werden|kann|können|verhindert|verhindern|reagiert|reagieren|verändert|verändern|bewegt|bewegen|steht|stehen|fehlt|fehlen|braucht|brauchen|verwendet|verwenden|lässt|lassen)\b)/iu,
    },
  },
  {
    id: "indonesian-heading-dehyphenated-reduplication",
    patterns: {
      id: /^#{2,6}[ \t]+[^\n]*\b(?:Jari Jari|Rata Rata)\b/iu,
    },
  },
  {
    id: "vague-application-ease",
    patterns: {
      de: /\b(?:Prinzipien|Regeln|Rahmen)\b[^.!?\n]{0,100}\bmach(?:t|en)\b[^.!?\n]{0,80}\b(?:Fragen|Ideen)\b[^.!?\n]{0,40}\b(?:leichter|klarer|geordneter)\b/iu,
      en: /\b(?:principles|rules|framework)\b[^.!?\n]{0,100}\bmakes?\b[^.!?\n]{0,80}\b(?:questions?|ideas?)\b[^.!?\n]{0,40}\b(?:easier|clearer|more organized)\b/iu,
      id: /\b(?:prinsip|aturan|kerangka)\b[^.!?\n]{0,100}\bmembuat\b[^.!?\n]{0,80}\b(?:pertanyaan|ide)\b[^.!?\n]{0,40}\b(?:lebih mudah|lebih jelas|lebih teratur)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];

const HEADING_PATTERN = /^(#{2,6})(\s+)(.+)$/u;
const METADATA_TITLE_PATTERN = /^(\s*title:\s*")([^"]+)(".*)$/u;
const ALLOWED_HEADING_CHARACTER = /[\p{L}\p{N} ]/u;
const NON_ORDINARY_SPACE_PATTERN = /[^ ]/u;

/** Identifies control bytes that are never valid authored lesson text. */
function isForbiddenControlCharacter(code: number): boolean {
  return (
    code <= 8 ||
    (code >= 11 && code <= 12) ||
    (code >= 14 && code <= 31) ||
    code === 127
  );
}

/** Rejects invisible control bytes that can silently corrupt prose or math. */
function findForbiddenControlCharacterIssue(
  line: string
): SourceIssue | undefined {
  for (let index = 0; index < line.length; index += 1) {
    if (isForbiddenControlCharacter(line.charCodeAt(index))) {
      return {
        column: index + 1,
        excerpt: line.trim(),
        rule: "forbidden-control-character",
      };
    }
  }
}

/** Finds the first symbol forbidden by the plain lesson heading policy. */
function findForbiddenHeadingCharacter(heading: string): number | undefined {
  for (let index = 0; index < heading.length; ) {
    const codePoint = heading.codePointAt(index);
    if (codePoint === undefined) {
      return;
    }
    const character = String.fromCodePoint(codePoint);
    if (!ALLOWED_HEADING_CHARACTER.test(character)) {
      return index;
    }
    index += character.length;
  }
}

/** Reports one symbol in an authored heading with its exact source column. */
function findHeadingSymbolIssue(line: string): SourceIssue | undefined {
  const match = HEADING_PATTERN.exec(line);
  if (!match) {
    return;
  }
  const [, headingMarker, headingSeparator, heading] = match;
  if (!(heading && headingMarker && headingSeparator)) {
    return;
  }
  const invalidSeparatorIndex = headingSeparator.search(
    NON_ORDINARY_SPACE_PATTERN
  );
  if (invalidSeparatorIndex !== -1) {
    return {
      column: headingMarker.length + invalidSeparatorIndex + 1,
      excerpt: line.trim(),
      rule: "heading-symbol",
    };
  }
  const symbolIndex = findForbiddenHeadingCharacter(heading);
  if (symbolIndex === undefined) {
    return;
  }
  return {
    column: headingMarker.length + headingSeparator.length + symbolIndex + 1,
    excerpt: line.trim(),
    rule: "heading-symbol",
  };
}

/** Applies the heading symbol policy to a lesson metadata title. */
function findMetadataTitleSymbolIssue(line: string): SourceIssue | undefined {
  const match = METADATA_TITLE_PATTERN.exec(line);
  if (!match) {
    return;
  }
  const [, metadataPrefix, title] = match;
  if (!(metadataPrefix && title)) {
    return;
  }
  const symbolIndex = findForbiddenHeadingCharacter(title);
  if (symbolIndex === undefined) {
    return;
  }
  return {
    column: metadataPrefix.length + symbolIndex + 1,
    excerpt: line.trim(),
    rule: "heading-symbol",
  };
}

/** Adds a source line to a structural issue when one was found. */
function locateIssue(
  issue: SourceIssue | undefined,
  line: number
): LessonVoiceIssue | undefined {
  return issue ? { ...issue, line } : undefined;
}

/** Checks title, heading, and inline math structure outside protected MDX. */
export function findStructuralIssues(
  line: string,
  lineNumber: number,
  state: LineState,
  isProtectedRegion: boolean
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  const controlCharacterIssue = locateIssue(
    findForbiddenControlCharacterIssue(line),
    lineNumber
  );
  if (controlCharacterIssue) {
    issues.push(controlCharacterIssue);
  }
  const metadataTitleIssue = state.inMetadata
    ? locateIssue(findMetadataTitleSymbolIssue(line), lineNumber)
    : undefined;
  if (metadataTitleIssue) {
    issues.push(metadataTitleIssue);
  }
  if (isProtectedRegion) {
    return issues;
  }
  const headingIssue = locateIssue(findHeadingSymbolIssue(line), lineNumber);
  if (headingIssue) {
    issues.push(headingIssue);
  }
  return issues;
}
