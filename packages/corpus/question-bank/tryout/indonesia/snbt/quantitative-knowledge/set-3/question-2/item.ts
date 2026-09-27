import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
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
