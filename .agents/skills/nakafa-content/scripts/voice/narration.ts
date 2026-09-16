import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks prose that narrates the lesson's own structure or sequence. */
export const NARRATION_VOICE_RULES = [
  {
    id: "lesson-structure-narration",
    patterns: {
      de: /\b(?:unter)?abschnitt(?:e|en)? (?:unten|oben)\b|\babschnitt (?:darüber|daruber|darunter)\b|\bfolgende(?:n)? abschnitte?\b|\bunterabschnitt\w*\b|\bin diesem abschnitt\b|\b(?:der|die|das) (?:nächste|naechste|vorige) abschnitt\b|\b(?:der|dieser) abschnitt\b(?!\s+(?:dieser|einer|der|des|eines))|\bin der folgenden reihenfolge\b|\bin dieser reihenfolge\b(?=[^.!?\n]*\b(?:Schritt|Schritte|gehen|gehst|vor)\b)|(?<![\p{L}\p{N}_])über die ganze lektion\b/iu,
      en: /\b(?:the|these|those|following|next)?\s*sections? (?:below|above)\b|\bthe (?:next|following|later|previous) sections?\b|\bin (?:this|that|the next|later|the previous|the following) (?:sub)?section\b|\bthis section\b|\bsub-?sections?\b|\b(?:this|the|that) (?:sub)?section (?:teaches|shows|explains|describes|compares|introduces|covers)\b|\bin the following order\s*[.!?]|\bacross the whole lesson\b/iu,
      id: /\bsubbagian\b|\bbagian (?:di bawah ini|berikutnya|berikut|selanjutnya|di atas)\b|\bsetiap pembahasan\b|\bpembahasan (?:berikut|berikutnya|di bawah ini|selanjutnya)\b|\bdengan urutan berikut\s*[.!?]|\bdi sepanjang pelajaran ini\b/iu,
    },
  },
  {
    id: "german-bare-im-folgenden",
    patterns: {
      // The nominalized adverb capitalizes `Folgenden`; the adjective in
      // `im folgenden Beispiel` stays lowercase and remains valid.
      de: /\b(?:im|Im) Folgenden\b/u,
    },
  },
] satisfies readonly LessonVoiceRule[];
