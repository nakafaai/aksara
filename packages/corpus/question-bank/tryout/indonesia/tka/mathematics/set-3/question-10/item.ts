import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "21" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "23" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "25" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "27" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "29" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "21" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "23" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "25" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "27" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "29" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "21" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "23" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "25" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "27" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "29" }],
        },
      ],
    },
  },
};

export default item;
