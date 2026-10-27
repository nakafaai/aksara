import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0$$ dan $$2$$",
        },
        {
          correct: true,
          label: "$$-1$$ dan $$0$$",
        },
        {
          correct: false,
          label: "$$1$$ dan $$2$$",
        },
        {
          correct: false,
          label: "$$-2$$ dan $$2$$",
        },
        {
          correct: false,
          label: "$$-2$$ dan $$1$$",
        },
      ],
    },
  },
};

export default item;
