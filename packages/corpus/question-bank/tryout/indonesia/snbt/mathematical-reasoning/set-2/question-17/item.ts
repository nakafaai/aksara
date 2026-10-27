import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1\\frac{1}{2}\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$6\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$4\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
