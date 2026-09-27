import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji kode pengembalian",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji kode pengembalian",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji kode pengembalian",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji kode pengembalian",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji kode pengembalian",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
