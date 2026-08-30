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
          label: [{ kind: "text", text: "245 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "250 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "255 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "260 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "265 m²" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "245 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "250 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "255 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "260 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "265 m²" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "245 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "250 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "255 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "260 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "265 m²" }],
        },
      ],
    },
  },
  stimulusKey: "park-and-pond",
};

export default item;
