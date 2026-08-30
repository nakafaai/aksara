import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0$$ und $$2$$",
        },
        {
          isCorrect: false,
          label: "$$1$$ und $$2$$",
        },
        {
          isCorrect: true,
          label: "$$-1$$ und $$0$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$ und $$2$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$ und $$1$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$0$$ and $$2$$" },
        { isCorrect: false, label: "$$1$$ and $$2$$" },
        { isCorrect: true, label: "$$-1$$ and $$0$$" },
        { isCorrect: false, label: "$$-2$$ and $$2$$" },
        { isCorrect: false, label: "$$-2$$ and $$1$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$0$$ dan $$2$$" },
        { isCorrect: false, label: "$$1$$ dan $$2$$" },
        { isCorrect: true, label: "$$-1$$ dan $$0$$" },
        { isCorrect: false, label: "$$-2$$ dan $$2$$" },
        { isCorrect: false, label: "$$-2$$ dan $$1$$" },
      ],
    },
  },
};

export default item;
