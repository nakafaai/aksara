import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1960$$ Einheiten",
        },
        {
          isCorrect: false,
          label: "$$2000$$ Einheiten",
        },
        {
          isCorrect: true,
          label: "$$2520$$ Einheiten",
        },
        {
          isCorrect: false,
          label: "$$2720$$ Einheiten",
        },
        {
          isCorrect: false,
          label: "$$3000$$ Einheiten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1960$$ units",
        },
        {
          isCorrect: false,
          label: "$$2000$$ units",
        },
        {
          isCorrect: true,
          label: "$$2520$$ units",
        },
        {
          isCorrect: false,
          label: "$$2720$$ units",
        },
        {
          isCorrect: false,
          label: "$$3000$$ units",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1960$$ unit",
        },
        {
          isCorrect: false,
          label: "$$2000$$ unit",
        },
        {
          isCorrect: true,
          label: "$$2520$$ unit",
        },
        {
          isCorrect: false,
          label: "$$2720$$ unit",
        },
        {
          isCorrect: false,
          label: "$$3000$$ unit",
        },
      ],
    },
  },
};

export default item;
