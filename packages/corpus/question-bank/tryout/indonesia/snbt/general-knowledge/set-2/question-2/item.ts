import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "jedoch." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "obwohl." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "während." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "sondern." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "vielmehr." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "however." }] },
        { isCorrect: false, label: [{ kind: "text", text: "although." }] },
        { isCorrect: false, label: [{ kind: "text", text: "while." }] },
        { isCorrect: true, label: [{ kind: "text", text: "but." }] },
        { isCorrect: false, label: [{ kind: "text", text: "rather." }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "namun." }] },
        { isCorrect: false, label: [{ kind: "text", text: "meskipun." }] },
        { isCorrect: false, label: [{ kind: "text", text: "sedangkan." }] },
        { isCorrect: true, label: [{ kind: "text", text: "tetapi." }] },
        { isCorrect: false, label: [{ kind: "text", text: "melainkan." }] },
      ],
    },
  },
};

export default item;
