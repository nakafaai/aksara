import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7$$ Tage",
        },
        {
          isCorrect: false,
          label: "$$8$$ Tage",
        },
        {
          isCorrect: false,
          label: "$$9$$ Tage",
        },
        {
          isCorrect: true,
          label: "$$10$$ Tage",
        },
        {
          isCorrect: false,
          label: "$$11$$ Tage",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$7$$ days" },
        { isCorrect: false, label: "$$8$$ days" },
        { isCorrect: false, label: "$$9$$ days" },
        { isCorrect: true, label: "$$10$$ days" },
        { isCorrect: false, label: "$$11$$ days" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$7$$ hari" },
        { isCorrect: false, label: "$$8$$ hari" },
        { isCorrect: false, label: "$$9$$ hari" },
        { isCorrect: true, label: "$$10$$ hari" },
        { isCorrect: false, label: "$$11$$ hari" },
      ],
    },
  },
};

export default item;
