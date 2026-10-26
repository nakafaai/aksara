import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3\\text{ m}^2, 2\\text{ m}^2, 4\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$3\\text{ m}^2, 4\\text{ m}^2, 2\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$3\\text{ m}^2, 4\\text{ m}^2, 5\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$2\\text{ m}^2, 3\\text{ m}^2, 4\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$4\\text{ m}^2, 5\\text{ m}^2, 6\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
