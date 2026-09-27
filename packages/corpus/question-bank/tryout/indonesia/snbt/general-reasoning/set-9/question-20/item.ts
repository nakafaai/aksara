import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "higrometer : kelembapan",
        },
        {
          isCorrect: false,
          label: "suhu : termometer",
        },
        {
          isCorrect: false,
          label: "jarak : odometer",
        },
        {
          isCorrect: false,
          label: "timbangan : kecepatan",
        },
        {
          isCorrect: false,
          label: "mikroskop : intensitas bunyi",
        },
      ],
    },
  },
};

export default item;
