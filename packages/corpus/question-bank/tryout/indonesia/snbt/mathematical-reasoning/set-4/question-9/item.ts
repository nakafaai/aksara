import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\text{ m}$$ und $$6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$3\\text{ m}$$ und $$7\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\text{ m}$$ und $$4\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$5\\text{ m}$$ und $$5\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ m}$$ und $$2\\text{ m}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\text{ m}$$ and $$6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$3\\text{ m}$$ and $$7\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\text{ m}$$ and $$4\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$5\\text{ m}$$ and $$5\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ m}$$ and $$2\\text{ m}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\text{ m}$$ dan $$6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$3\\text{ m}$$ dan $$7\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\text{ m}$$ dan $$4\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$5\\text{ m}$$ dan $$5\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ m}$$ dan $$2\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
