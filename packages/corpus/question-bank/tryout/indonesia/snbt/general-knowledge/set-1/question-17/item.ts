import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "gefallen." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Onkel." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Nation." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Held." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Feind." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "fell." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "uncle." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "nation." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "hero." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "enemy." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "gugur." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "paman." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "bangsa." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pahlawan." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "musuh." }],
        },
      ],
    },
  },
};

export default item;
