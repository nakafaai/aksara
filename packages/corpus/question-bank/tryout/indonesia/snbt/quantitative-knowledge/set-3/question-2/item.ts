import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ oder $$-5$$",
        },
        {
          isCorrect: true,
          label: "$$2$$ oder $$5$$",
        },
        {
          isCorrect: false,
          label: "$$4$$ oder $$-2$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$ oder $$5$$",
        },
        {
          isCorrect: false,
          label: "$$-4$$ oder $$-2$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ or $$-5$$",
        },
        {
          isCorrect: true,
          label: "$$2$$ or $$5$$",
        },
        {
          isCorrect: false,
          label: "$$4$$ or $$-2$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$ or $$5$$",
        },
        {
          isCorrect: false,
          label: "$$-4$$ or $$-2$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ atau $$-5$$",
        },
        {
          isCorrect: true,
          label: "$$2$$ atau $$5$$",
        },
        {
          isCorrect: false,
          label: "$$4$$ atau $$-2$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$ atau $$5$$",
        },
        {
          isCorrect: false,
          label: "$$-4$$ atau $$-2$$",
        },
      ],
    },
  },
};

export default item;
