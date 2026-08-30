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
          isCorrect: false,
          label: "Kaninchen",
        },
        {
          isCorrect: false,
          label: "Ente",
        },
        {
          isCorrect: true,
          label: "Lamm",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Chicken" },
        { isCorrect: false, label: "Beef" },
        { isCorrect: false, label: "Rabbit" },
        { isCorrect: false, label: "Duck" },
        { isCorrect: true, label: "Lamb" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Ayam" },
        { isCorrect: false, label: "Sapi" },
        { isCorrect: false, label: "Kelinci" },
        { isCorrect: false, label: "Bebek" },
        { isCorrect: true, label: "Domba" },
      ],
    },
  },
};

export default item;
