import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$85\\,\\text{km/jam}$$",
        },
        {
          correct: false,
          label: "$$95\\,\\text{km/jam}$$",
        },
        {
          correct: false,
          label: "$$80\\,\\text{km/jam}$$",
        },
        {
          correct: false,
          label: "$$90\\,\\text{km/jam}$$",
        },
        {
          correct: true,
          label: "$$75\\,\\text{km/jam}$$",
        },
      ],
    },
  },
};

export default item;
