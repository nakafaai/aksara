import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "9" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "11" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "13" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "9" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "11" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "13" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "9" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "11" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "13" }],
        },
      ],
    },
  },
};

export default item;
