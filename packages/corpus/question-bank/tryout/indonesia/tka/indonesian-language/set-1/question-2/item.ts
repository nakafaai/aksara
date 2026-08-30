import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "penyimpanan benih dalam waktu lama",
        },
        {
          isCorrect: false,
          label: "pengujian benih di laboratorium",
        },
        {
          isCorrect: false,
          label: "penjualan benih kepada warga",
        },
        {
          isCorrect: true,
          label: "pergerakan benih dalam suatu putaran",
        },
        {
          isCorrect: false,
          label: "penggantian semua varietas lama",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;
