import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a=-3$$",
        },
        {
          correct: false,
          label: "$$a=-2$$",
        },
        {
          correct: true,
          label: "$$a=2$$",
        },
        {
          correct: false,
          label: "$$a=2$$ und $$a=-3$$",
        },
        {
          correct: false,
          label: "für keinen Wert von $$a$$",
        },
        {
          correct: false,
          label: "für jedes $$a\\ne2$$",
        },
      ],
    },
  },
};

export default item;
