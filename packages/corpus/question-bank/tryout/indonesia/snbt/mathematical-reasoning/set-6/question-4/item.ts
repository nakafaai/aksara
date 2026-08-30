import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7$$ Monate",
        },
        {
          isCorrect: false,
          label: "$$8$$ Monate",
        },
        {
          isCorrect: true,
          label: "$$10$$ Monate",
        },
        {
          isCorrect: false,
          label: "$$9$$ Monate",
        },
        {
          isCorrect: false,
          label: "$$12$$ Monate",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7$$ months",
        },
        {
          isCorrect: false,
          label: "$$8$$ months",
        },
        {
          isCorrect: true,
          label: "$$10$$ months",
        },
        {
          isCorrect: false,
          label: "$$9$$ months",
        },
        {
          isCorrect: false,
          label: "$$12$$ months",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$8$$ bulan",
        },
        {
          isCorrect: true,
          label: "$$10$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$9$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$12$$ bulan",
        },
      ],
    },
  },
};

export default item;
