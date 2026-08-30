import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$1$$" },
        { isCorrect: true, label: "$$2$$ and $$3$$" },
        { isCorrect: false, label: "$$2$$ and $$4$$" },
        { isCorrect: false, label: "$$3$$ and $$4$$" },
        { isCorrect: false, label: "$$4$$" },
      ],
    },
  },
};

export default item;
