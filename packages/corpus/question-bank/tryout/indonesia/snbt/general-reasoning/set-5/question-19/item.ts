import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "categorical-syllogism",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sebagian peserta pameran sekolah adalah anggota klub teater.",
        },
        {
          correct: false,
          label:
            "Tidak ada anggota klub fotografi yang menjadi panitia pentas seni.",
        },
        {
          correct: false,
          label: "Sebagian anggota klub teater bukan anggota klub fotografi.",
        },
        {
          correct: true,
          label: "Sebagian anggota klub fotografi bukan anggota klub teater.",
        },
        {
          correct: false,
          label: "Sebagian anggota klub teater tidak mengikuti pameran sekolah.",
        },
      ],
    },
  },
};

export default item;
