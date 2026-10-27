import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1\\text{ jam }20\\text{ menit}$$",
        },
        {
          correct: true,
          label: "$$1\\text{ jam }15\\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$1\\text{ jam }25\\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$2\\text{ jam }15\\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$2\\text{ jam }20\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
