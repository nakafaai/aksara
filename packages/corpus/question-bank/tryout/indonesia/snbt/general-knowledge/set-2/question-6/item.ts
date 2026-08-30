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
          isCorrect: true,
          label: "Fledermäuse.",
        },
        {
          isCorrect: false,
          label: "Beutetiere der Fledermäuse.",
        },
        {
          isCorrect: false,
          label: "Insekten und Kleintiere.",
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
          isCorrect: true,
          label: "bats.",
        },
        {
          isCorrect: false,
          label: "bat prey.",
        },
        {
          isCorrect: false,
          label: "insects and small animals.",
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
          isCorrect: true,
          label: "kelelawar.",
        },
        {
          isCorrect: false,
          label: "mangsa kelelawar.",
        },
        {
          isCorrect: false,
          label: "serangga dan hewan kecil.",
        },
      ],
    },
  },
};

export default item;
