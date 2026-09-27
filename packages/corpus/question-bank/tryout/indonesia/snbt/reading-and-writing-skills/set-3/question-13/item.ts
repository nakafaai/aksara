import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kerja sama tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerjasama tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam pengujian kartu urutan bahan",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam pengujian kartu urutan bahan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
