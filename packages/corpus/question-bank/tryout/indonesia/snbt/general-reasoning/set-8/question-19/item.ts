import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$60$$ und $$155$$ Personen",
        },
        {
          isCorrect: true,
          label: "$$60$$ und $$145$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$62$$ und $$155$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$62$$ und $$145$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$65$$ und $$155$$ Personen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$60$$ and $$155$$ people" },
        { isCorrect: true, label: "$$60$$ and $$145$$ people" },
        { isCorrect: false, label: "$$62$$ and $$155$$ people" },
        { isCorrect: false, label: "$$62$$ and $$145$$ people" },
        { isCorrect: false, label: "$$65$$ and $$155$$ people" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$60$$ dan $$155$$ orang" },
        { isCorrect: true, label: "$$60$$ dan $$145$$ orang" },
        { isCorrect: false, label: "$$62$$ dan $$155$$ orang" },
        { isCorrect: false, label: "$$62$$ dan $$145$$ orang" },
        { isCorrect: false, label: "$$65$$ dan $$155$$ orang" },
      ],
    },
  },
};

export default item;
