import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas kartu urutan bahan di lokakarya kompos",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas kartu urutan bahan di lokakarya kompos",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas kartu urutan bahan di lokakarya kompos",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas kartu urutan bahan di lokakarya kompos",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas kartu urutan bahan dalam kontek lokakarya kompos",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
