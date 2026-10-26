import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$1\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$1\\text{ jam} 30\\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$2\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$2\\text{ jam} 30\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
