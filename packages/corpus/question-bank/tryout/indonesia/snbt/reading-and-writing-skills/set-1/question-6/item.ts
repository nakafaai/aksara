import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dagegen" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Außerdem" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Deshalb" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dennoch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Zum Beispiel" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "In contrast" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "In addition" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Therefore" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Nevertheless" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "For example" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Sebaliknya" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Selain itu" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Oleh karena itu" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Namun" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Misalnya" }],
        },
      ],
    },
  },
};

export default item;
