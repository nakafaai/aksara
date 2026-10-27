import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5\\text{ m}$$ dan $$6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$3\\text{ m}$$ dan $$7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ m}$$ dan $$4\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$5\\text{ m}$$ dan $$5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ m}$$ dan $$2\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
