import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}085$$",
        },
        {
          correct: false,
          label: "$$0{,}85$$",
        },
        {
          correct: false,
          label: "$$0{,}95$$",
        },
        {
          correct: false,
          label: "$$0{,}075$$",
        },
        {
          correct: true,
          label: "$$0{,}095$$",
        },
      ],
    },
  },
};

export default item;
