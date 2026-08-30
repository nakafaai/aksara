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
          label: [{ kind: "text", text: "104 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "108 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "112 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "116 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "120 m" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "104 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "108 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "112 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "116 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "120 m" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "104 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "108 m" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "112 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "116 m" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "120 m" }],
        },
      ],
    },
  },
  stimulusKey: "park-and-pond",
};

export default item;
