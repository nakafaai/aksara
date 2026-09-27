import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas kode pengembalian dalam kontek peminjaman payung",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
