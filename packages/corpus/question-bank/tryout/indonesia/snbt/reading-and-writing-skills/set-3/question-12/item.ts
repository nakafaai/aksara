import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji kartu urutan bahan di lokakarya kompos",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
