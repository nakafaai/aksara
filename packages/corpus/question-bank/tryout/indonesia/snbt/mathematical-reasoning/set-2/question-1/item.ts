import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$70\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$80\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$60\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$90\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
