import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "bus-ridership",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kenaikan total penumpang, karena semua koridor sama-sama mendapat penurunan tarif",
        },
        {
          correct: false,
          label:
            "kenaikan di Koridor A, karena koridor itu punya penumpang terbanyak sesudah perubahan",
        },
        {
          correct: true,
          label:
            "kenaikan di Koridor C dan Koridor D, karena hanya tarif yang berubah di kedua koridor itu",
        },
        {
          correct: false,
          label:
            "selisih kenaikan antara Koridor A dan Koridor B, karena keduanya sama-sama dibuat lebih sering",
        },
        {
          correct: false,
          label:
            "kenaikan di Koridor B, karena koridor itu penumpangnya paling sedikit sebelum perubahan",
        },
      ],
    },
  },
};

export default item;
