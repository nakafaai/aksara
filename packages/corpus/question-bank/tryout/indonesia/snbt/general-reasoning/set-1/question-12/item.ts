import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$72\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$132\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$360\\text{ jam}$$",
        },
        {
          correct: true,
          label: "$$144\\text{ jam}$$",
        },
      ],
    },
  },
};

export default item;
