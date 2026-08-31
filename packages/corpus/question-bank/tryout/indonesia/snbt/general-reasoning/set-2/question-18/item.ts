import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Huhn",
        },
        {
          isCorrect: false,
          label: "Rindfleisch",
        },
        {
          isCorrect: true,
          label: "Lamm",
        },
        {
          isCorrect: false,
          label: "Kaninchen",
        },
        {
          isCorrect: false,
          label: "Ente",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Chicken" },
        { isCorrect: false, label: "Beef" },
        { isCorrect: true, label: "Lamb" },
        { isCorrect: false, label: "Rabbit" },
        { isCorrect: false, label: "Duck" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Ayam" },
        { isCorrect: false, label: "Sapi" },
        { isCorrect: true, label: "Domba" },
        { isCorrect: false, label: "Kelinci" },
        { isCorrect: false, label: "Bebek" },
      ],
    },
  },
};

export default item;
