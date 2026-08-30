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
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "10" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "10" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "10" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "12" }],
        },
      ],
    },
  },
};

export default item;
