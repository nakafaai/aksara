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
          label: [{ kind: "text", text: "369 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "376 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "383 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "390 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "397 m²" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "369 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "376 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "383 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "390 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "397 m²" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "369 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "376 m²" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "383 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "390 m²" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "397 m²" }],
        },
      ],
    },
  },
  stimulusKey: "park-and-pond",
};

export default item;
