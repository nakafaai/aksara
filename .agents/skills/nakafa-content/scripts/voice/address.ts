import type { LessonVoiceRule } from "#nakafa-content/voice/types";

const GERMAN_UNANCHORED_PERSONAL_ADDRESS_PATTERNS = [
  /^\s*(?:Hinweis:\s+)?(?:(?:[-+*]|\d+[.)])\s+)?(?:\*{1,2}|_{1,2})?Sie(?:\*{1,2}|_{1,2})?\s+(?:[\p{Ll}][\p{L}-]*(?:en|eln|ern)|sind|tun)\b/u,
  /^\s*(?:Hinweis:\s+)?(?:(?:[-+*]|\d+[.)])\s+)?(?:\*{1,2}|_{1,2})?Ihnen(?:\*{1,2}|_{1,2})?\s+(?:steht|stehen)\b[^.!?\n]{0,80}\bzur Verfügung\b/u,
  /^\s*(?:Hinweis:\s+)?(?:(?:[-+*]|\d+[.)])\s+)?(?:\*{1,2}|_{1,2})?Ihnen(?:\*{1,2}|_{1,2})?\s+wird\b[^.!?\n]{0,80}\bangezeigt\b/u,
] as const;
const GERMAN_ESTABLISHED_FORMAL_SENTENCE_PATTERN =
  /[.!?]\s+Sie\s+(?:(?:können|sollten|müssen|dürfen)\s+(?:[\p{L}-]+\s+){0,6}(?:ablesen|anwenden|ausfüllen|bearbeiten|berechnen|bestimmen|einsetzen|erkennen|ermitteln|finden|lösen|notieren|prüfen|sehen|umformen|vergleichen|verwenden|wählen|zeichnen)|(?:berechnen|bestimmen|erhalten|erkennen|finden|lernen|lösen|notieren|prüfen|sehen|vergleichen|verwenden|wählen|zeichnen)\b)/u;
const GERMAN_UNANCHORED_POSSESSIVE_ADDRESS_PATTERN =
  /^\s*(?:(?:[-+*]|\d+[.)])\s+)?(?:\*{1,2}|_{1,2})?Ihr(?:e|en|em|er|es)?(?:\*{1,2}|_{1,2})?\s+(?:Antwort|Aufgabe|Eingabe|Ergebnis|Lösung|Rechnung|Ziel)\b/u;
const GERMAN_ADDRESS_PRONOUN_PATTERN = /(?:Sie|Ihnen|Ihr(?:e|en|em|er|es)?)/u;
const GERMAN_FEMININE_SUBJECT_PATTERN =
  /(?:^|[.!?]\s+)(?:Die|Eine|Diese|Jene|Beide|Mehrere)\s+(?:[\p{Ll}][\p{L}-]*\s+){0,4}[\p{Lu}][\p{L}-]*\b/u;
const GERMAN_PLURAL_SUBJECT_PATTERN =
  /(?:^|[\s,])(?:Die|Diese|Jene|Beide|Mehrere|Ähnliche|Normierte|beide[nm]?|mehrere|ähnliche|normierte)(?:\s+[\p{Ll}][\p{L}-]*){0,3}\s+[\p{Lu}][\p{L}-]*(?:\s+(?:<[^>\n]+>|[\p{L}-]+)){0,14}\s+(?:beschreiben|besitzen|bleiben|erfüllen|haben|können|lauten|liegen|schließen|sind|stehen|werden|zeigen)\b/u;

export const GERMAN_FORMAL_ADDRESS_PATTERN =
  /(?:(?<=[\p{L}\p{N},;]\s)(?:Sie|Ihnen|Ihr(?:e|en|em|er|es)?)\b|^\s*(?:#{1,6}\s+|\|\s*(?:Aufgabe|Hinweis|Kontrolle|Schritt|Tipp)\s*\|\s*)(?:\*{1,2}|_{1,2})?(?:Sie(?:\*{1,2}|_{1,2})?\s+(?:können|sollten|müssen|dürfen|berechnen|bestimmen|erkennen|finden|lösen|prüfen|sehen|vergleichen|verwenden|wählen|zeichnen)\b|Ihnen(?:\*{1,2}|_{1,2})?\s+(?:steht|stehen|wird)\b|Ihr(?:e|en|em|er|es)?(?:\*{1,2}|_{1,2})?\s+(?:Antwort|Aufgabe|Eingabe|Ergebnis|Lösung|Rechnung|Ziel)\b))/u;

/** Checks the immediately preceding paragraph for a valid ihr antecedent. */
export function germanAntecedentState(text: string): {
  personal: boolean;
  possessive: boolean;
} {
  const personal = GERMAN_PLURAL_SUBJECT_PATTERN.test(text);
  return {
    personal,
    possessive: personal || GERMAN_FEMININE_SUBJECT_PATTERN.test(text),
  };
}

/** Finds a formal address only when the local frame requires a human actor. */
export function unanchoredGermanFormalAddressOffset(
  text: string,
  allowPossessiveAddress = true,
  allowPersonalAddress = true
): number | undefined {
  const patterns = [
    ...(allowPersonalAddress
      ? GERMAN_UNANCHORED_PERSONAL_ADDRESS_PATTERNS
      : []),
    ...(allowPossessiveAddress
      ? [GERMAN_UNANCHORED_POSSESSIVE_ADDRESS_PATTERN]
      : []),
  ];
  const offsets = patterns.flatMap((pattern) => {
    const match = pattern.exec(text);
    if (match?.index === undefined) {
      return [];
    }
    return [match.index + match[0].search(GERMAN_ADDRESS_PRONOUN_PATTERN)];
  });
  return offsets.length === 0 ? undefined : Math.min(...offsets);
}

/** Continues an already proven formal register across one paragraph. */
export function establishedGermanFormalSentenceOffset(
  text: string
): number | undefined {
  const match = GERMAN_ESTABLISHED_FORMAL_SENTENCE_PATTERN.exec(text);
  if (match?.index === undefined) {
    return;
  }
  return match.index + match[0].search(GERMAN_ADDRESS_PRONOUN_PATTERN);
}

/** Enforces Nakafa's Indonesian learner address in authored visible prose. */
export const ADDRESS_VOICE_RULES = [
  {
    id: "indonesian-formal-learner-address",
    inspectLinkLabels: true,
    patterns: { id: /\bAnda\b/iu },
    protectInlineQuotations: true,
  },
  {
    id: "indonesian-formal-author-self-reference",
    inspectLinkLabels: true,
    patterns: { id: /\bsaya\b/iu },
    protectInlineQuotations: true,
  },
  {
    id: "indonesian-plural-learner-address",
    inspectLinkLabels: true,
    patterns: { id: /\bkalian\b/iu },
    protectInlineQuotations: true,
  },
] satisfies readonly LessonVoiceRule[];
