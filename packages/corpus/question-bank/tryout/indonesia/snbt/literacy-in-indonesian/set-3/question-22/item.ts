import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "word-meaning",
  },
  stimulus: "youth-pledge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bahasa Indonesia menjadi bahasa bersama tanpa menghapus bahasa-bahasa daerah.",
        },
        {
          correct: false,
          label:
            "Para pemuda wajib berhenti memakai bahasa daerah dalam kehidupan sehari-hari.",
        },
        {
          correct: false,
          label:
            "Bahasa Indonesia ditetapkan sebagai satu-satunya bahasa resmi pada tahun 1928.",
        },
        {
          correct: false,
          label:
            "Para pemuda menganggap bahasa daerah lebih tinggi daripada bahasa Indonesia.",
        },
        {
          correct: false,
          label:
            "Bahasa Indonesia hanya dipakai dalam kongres dan tidak dalam kegiatan lain.",
        },
      ],
    },
  },
};

export default item;
