import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bibit kemungkinan besar hilang karena penandanya tidak ditemukan pada pemantauan itu",
        },
        {
          isCorrect: false,
          label:
            "Bibit dianggap mati karena tidak ditemukan ketika penandanya hilang",
        },
        {
          isCorrect: true,
          label: "Bibit tidak ditemukan; status hidup belum dapat dipastikan",
        },
        {
          isCorrect: false,
          label:
            "Pemantauan belum dapat digunakan sebelum setiap bibit ditemukan kembali",
        },
        {
          isCorrect: false,
          label:
            "Arus dapat dianggap penyebab kematian karena beberapa penanda ikut terbawa",
        },
      ],
    },
  },
  stimulusKey: "mangrove-nursery",
};

export default item;
