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
          label: [{ kind: "text", text: "Rp 205.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 200.000" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Rp 220.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 230.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 250.000" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 205.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 200.000" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Rp 220.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 230.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 250.000" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 205.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 200.000" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Rp 220.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 230.000" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Rp 250.000" }],
        },
      ],
    },
  },
};

export default item;
