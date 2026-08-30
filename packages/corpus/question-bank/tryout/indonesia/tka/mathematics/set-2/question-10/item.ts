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
          label: [{ kind: "text", text: "11" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "13" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "15" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "17" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "19" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "11" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "13" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "15" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "17" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "19" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "11" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "13" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "15" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "17" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "19" }],
        },
      ],
    },
  },
};

export default item;
