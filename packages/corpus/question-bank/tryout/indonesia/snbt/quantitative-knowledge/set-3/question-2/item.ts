import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$ atau $$-5$$",
        },
        {
          correct: true,
          label: "$$2$$ atau $$5$$",
        },
        {
          correct: false,
          label: "$$4$$ atau $$-2$$",
        },
        {
          correct: false,
          label: "$$-2$$ atau $$5$$",
        },
        {
          correct: false,
          label: "$$-4$$ atau $$-2$$",
        },
      ],
    },
  },
};

export default item;
