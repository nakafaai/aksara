import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\left(18\\pi-27\\sqrt3\\right)\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$\\left(18\\pi-18\\sqrt3\\right)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(18\\pi-9\\sqrt3\\right)\\text{ cm}^2$$",
        },
        { correct: false, label: "$$18\\pi\\text{ cm}^2$$" },
        {
          correct: false,
          label: "$$\\left(36\\pi-18\\sqrt3\\right)\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
