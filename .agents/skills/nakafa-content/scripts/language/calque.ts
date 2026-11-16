import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks narrow Indonesian calques that obscure the lesson's meaning. */
export const LANGUAGE_CALQUE_RULES = [
  {
    id: "indonesian-transformation-image-calque",
    patterns: {
      id: /\b(?:hitung|mencari)\s+peta\b|\b(?:koordinat|titik)\s+peta(?:\s+dari)?\b|\bpeta\s+(?:akhir(?:nya)?|titik(?:nya)?)\b|\bpeta\s+dari(?:\s+(?:garis|segitiga|titik)\b|(?=\s*(?:[.,!?]|$)))|\bpetanya\s+(?:adalah|dapat|berupa)\b|^\s*(?:-\s*)?peta(?:\s*:|\s+<InlineMath)/iu,
      ms: /\b(?:kira|cari)\s+peta\b|\b(?:koordinat|titik)\s+peta(?:\s+bagi)?\b|\bpeta\s+(?:akhir(?:nya)?|titik(?:nya)?)\b|\bpetanya\s+(?:ialah|adalah|boleh|berupa)\b/iu,
    },
  },
  {
    id: "indonesian-floor-division-calque",
    patterns: { id: /\bpembagian lantai\b/iu, ms: /\bpembahagian lantai\b/iu },
  },
  {
    id: "indonesian-unit-cancellation-calque",
    patterns: {
      id: /\bsatuan(?:-satuan)?\b[^.!?\n]{0,40}\bsaling habis\b/iu,
      ms: /\bunit(?:-unit)?\b[^.!?\n]{0,40}\bsaling (?:habis|hapus)\b/iu,
    },
  },
  {
    id: "indonesian-water-ratio-gateway",
    patterns: { id: /\bgerbang rasio air\b/iu, ms: /\bpintu nisbah air\b/iu },
  },
  {
    id: "indonesian-dimensional-container-calque",
    patterns: {
      id: /\bwadah\s+(?:n[ -]?dimensi|berdimensi\s+n)\b/iu,
      ms: /\bbekas\s+(?:n[ -]?dimensi|berdimensi\s+n)\b/iu,
    },
  },
  {
    id: "indonesian-unexplained-regularization-calque",
    patterns: {
      id: /(?:\b(?:arah|komponen|solusi)\b[^.!?\n]{0,100}\bdisusutkan\b|\b(?:memperbesar|penguatan)\s+derau\b)/iu,
      ms: /(?:\b(?:arah|komponen|penyelesaian)\b[^.!?\n]{0,100}\bdisusutkan\b|\b(?:membesarkan|penguatan)\s+hingar\b)/iu,
    },
  },
  {
    id: "indonesian-mechanical-input-constraint-calque",
    patterns: {
      id: /(?:\bkomposisi\b[^.!?\n]{0,100}\bmengembalikan\s+masukan\b|\bterjemahkan\s+kendala\s+keliling\b)/iu,
      ms: /(?:\bkomposisi\b[^.!?\n]{0,100}\bmengembalikan\s+input\b|\bterjemahkan\s+kekangan\s+perimeter\b)/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
