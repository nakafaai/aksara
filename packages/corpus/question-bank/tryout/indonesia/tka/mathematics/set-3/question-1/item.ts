import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "10" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "14" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "10" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "14" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "10" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "14" }],
        },
      ],
    },
  },
};

export default item;
