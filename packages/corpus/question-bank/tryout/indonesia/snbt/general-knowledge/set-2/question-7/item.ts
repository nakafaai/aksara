import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tiere, die gejagt werden.",
        },
        {
          isCorrect: false,
          label: "kleine Tiere, die von anderen Tieren gefressen werden.",
        },
        {
          isCorrect: false,
          label: "kleine Insekten.",
        },
        {
          isCorrect: false,
          label: "Insekten und andere Kleintiere.",
        },
        {
          isCorrect: true,
          label: "Tiere, die andere Tiere jagen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "animals that are preyed upon.",
        },
        {
          isCorrect: false,
          label: "small animals that are eaten by other animals.",
        },
        {
          isCorrect: false,
          label: "small insects.",
        },
        {
          isCorrect: false,
          label: "insects and other small animals.",
        },
        {
          isCorrect: true,
          label: "animals that prey on other animals.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "hewan yang dimangsa.",
        },
        {
          isCorrect: false,
          label: "hewan kecil yang dimakan oleh hewan lainnya.",
        },
        {
          isCorrect: false,
          label: "serangga kecil.",
        },
        {
          isCorrect: false,
          label: "serangga dan hewan kecil lainnya.",
        },
        {
          isCorrect: true,
          label: "hewan pemangsa hewan lainnya.",
        },
      ],
    },
  },
};

export default item;
