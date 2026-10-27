import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$41\\text{ jam }15\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$41\\text{ jam }25\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$42\\text{ jam }15\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$42\\text{ jam }25\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$42\\text{ jam }45\\text{ min}$$",
        },
      ],
    },
  },
};

export default item;
