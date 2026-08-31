import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$45$$ und $$186$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$45$$ und $$187$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$45$$ und $$188$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$46$$ und $$189$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$46$$ und $$190$$ Personen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$45$$ and $$186$$ people",
        },
        {
          isCorrect: false,
          label: "$$45$$ and $$187$$ people",
        },
        {
          isCorrect: false,
          label: "$$45$$ and $$188$$ people",
        },
        {
          isCorrect: false,
          label: "$$46$$ and $$189$$ people",
        },
        {
          isCorrect: false,
          label: "$$46$$ and $$190$$ people",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$45$$ dan $$186$$ orang",
        },
        {
          isCorrect: false,
          label: "$$45$$ dan $$187$$ orang",
        },
        {
          isCorrect: false,
          label: "$$45$$ dan $$188$$ orang",
        },
        {
          isCorrect: false,
          label: "$$46$$ dan $$189$$ orang",
        },
        {
          isCorrect: false,
          label: "$$46$$ dan $$190$$ orang",
        },
      ],
    },
  },
};

export default item;
