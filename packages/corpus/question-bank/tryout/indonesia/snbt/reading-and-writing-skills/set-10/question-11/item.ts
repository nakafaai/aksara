import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisa efektivitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: false,
          label:
            "analisis efektifitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: true,
          label:
            "analisis efektivitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: false,
          label:
            "analisa efektifitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas peta kecil dengan waktu tempuh dalam kontek taman kota",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
