import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas jadwal digital dalam kontek ruang latihan musik",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
