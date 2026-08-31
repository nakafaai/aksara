import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Insekten.",
        },
        {
          isCorrect: false,
          label: "kleine Tiere.",
        },
        {
          isCorrect: false,
          label: "Beutetiere der Fledermäuse.",
        },
        {
          isCorrect: false,
          label: "Insekten und Kleintiere.",
        },
        {
          isCorrect: true,
          label: "Fledermäuse.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "insects.",
        },
        {
          isCorrect: false,
          label: "small animals.",
        },
        {
          isCorrect: false,
          label: "bat prey.",
        },
        {
          isCorrect: false,
          label: "insects and small animals.",
        },
        {
          isCorrect: true,
          label: "bats.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "serangga.",
        },
        {
          isCorrect: false,
          label: "hewan kecil.",
        },
        {
          isCorrect: false,
          label: "mangsa kelelawar.",
        },
        {
          isCorrect: false,
          label: "serangga dan hewan kecil.",
        },
        {
          isCorrect: true,
          label: "kelelawar.",
        },
      ],
    },
  },
};

export default item;
