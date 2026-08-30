import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "80 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "84 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "88 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "92 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "96 m" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "80 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "84 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "88 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "92 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "96 m" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "80 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "84 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "88 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "92 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "96 m" }],
        },
      ],
    },
  },
  stimulusKey: "park-and-pond",
};

export default item;
