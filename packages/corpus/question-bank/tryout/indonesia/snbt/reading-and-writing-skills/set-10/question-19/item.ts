import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
