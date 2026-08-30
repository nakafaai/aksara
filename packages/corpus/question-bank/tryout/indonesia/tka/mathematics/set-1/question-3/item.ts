import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 117.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 120.000" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Rp 132.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 142.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 150.000" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 117.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 120.000" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Rp 132.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 142.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 150.000" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 117.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 120.000" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Rp 132.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 142.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 150.000" }],
        },
      ],
    },
  },
};

export default item;
