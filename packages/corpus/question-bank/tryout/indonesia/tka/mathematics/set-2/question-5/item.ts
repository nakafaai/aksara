import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "3" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "3" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "3" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "4" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "5" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "6" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "7" }],
        },
      ],
    },
  },
};

export default item;
