import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Kamera jebak" },
        { isCorrect: false, label: "Kompas" },
        { isCorrect: false, label: "Radio genggam" },
        { isCorrect: true, label: "GPS Collar" },
        {
          isCorrect: false,
          label: "Penerima satelit",
        },
      ],
    },
  },
};

export default item;
