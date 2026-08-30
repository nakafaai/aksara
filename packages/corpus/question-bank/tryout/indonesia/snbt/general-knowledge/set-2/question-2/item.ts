import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "jedoch.",
        },
        {
          isCorrect: true,
          label: "sondern.",
        },
        {
          isCorrect: false,
          label: "obwohl.",
        },
        {
          isCorrect: false,
          label: "während.",
        },
        {
          isCorrect: false,
          label: "vielmehr.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "however." },
        { isCorrect: true, label: "but." },
        { isCorrect: false, label: "although." },
        { isCorrect: false, label: "while." },
        { isCorrect: false, label: "rather." },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "namun." },
        { isCorrect: true, label: "tetapi." },
        { isCorrect: false, label: "meskipun." },
        { isCorrect: false, label: "sedangkan." },
        { isCorrect: false, label: "melainkan." },
      ],
    },
  },
};

export default item;
