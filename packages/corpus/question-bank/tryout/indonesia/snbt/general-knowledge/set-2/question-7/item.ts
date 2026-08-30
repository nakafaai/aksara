import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Tiere, die andere Tiere jagen.",
        },
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
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "animals that prey on other animals.",
        },
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
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "hewan pemangsa hewan lainnya.",
        },
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
      ],
    },
  },
};

export default item;
