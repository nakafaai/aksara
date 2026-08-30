import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Insekten." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kleine Tiere." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Beutetiere der Fledermäuse." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Fledermäuse." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Insekten und Kleintiere." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "insects." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "small animals." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "bat prey." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "bats." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "insects and small animals." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "serangga." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "hewan kecil." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "mangsa kelelawar." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "kelelawar." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "serangga dan hewan kecil." }],
        },
      ],
    },
  },
};

export default item;
