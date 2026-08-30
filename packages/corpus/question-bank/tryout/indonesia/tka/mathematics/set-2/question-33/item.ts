import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
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
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
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
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
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
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
        },
      ],
    },
  },
};

export default item;
