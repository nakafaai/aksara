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
          label: [{ kind: "text", text: "304 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "310 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "316 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "322 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "328 m²" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "304 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "310 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "316 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "322 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "328 m²" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "304 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "310 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "316 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "322 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "328 m²" }],
        },
      ],
    },
  },
  stimulusKey: "park-and-pond",
};

export default item;
