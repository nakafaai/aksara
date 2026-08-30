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
          label: [{ kind: "text", text: "2" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "10" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "2" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "10" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "2" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "8" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "10" }],
        },
      ],
    },
  },
};

export default item;
