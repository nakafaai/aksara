import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bibit kemungkinan besar hilang karena penandanya tidak ditemukan pada pemantauan itu",
        },
        {
          correct: false,
          label:
            "Bibit dianggap mati karena tidak ditemukan ketika penandanya hilang",
        },
        {
          correct: true,
          label:
            "Bibit tidak ditemukan. Status hidup bibit belum dapat dipastikan",
        },
        {
          correct: false,
          label:
            "Pemantauan belum dapat digunakan sebelum setiap bibit ditemukan kembali",
        },
        {
          correct: false,
          label:
            "Arus dapat dianggap penyebab kematian karena beberapa penanda ikut terbawa",
        },
      ],
    },
  },
};

export default item;
