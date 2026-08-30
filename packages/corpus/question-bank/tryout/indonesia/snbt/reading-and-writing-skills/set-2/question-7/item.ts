import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "tritt auf, wenn." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "obwohl." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "damit." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "außer wenn." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "nachdem." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "occurs when." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "even though." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "so that." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "unless." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "after." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "terjadi ketika." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "meskipun." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "agar." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kecuali." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "setelah." }],
        },
      ],
    },
  },
};

export default item;
