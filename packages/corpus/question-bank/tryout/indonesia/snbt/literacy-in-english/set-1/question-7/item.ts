import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "parking-minimums",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "is usually exempt from paying for parking.",
        },
        {
          correct: true,
          label: "helps pay for parking spaces it does not use.",
        },
        {
          correct: false,
          label:
            "receives a discount on rent in exchange for giving up a space.",
        },
        {
          correct: false,
          label: "is eventually encouraged to buy a car.",
        },
        {
          correct: false,
          label: "pays lower housing costs than households with cars.",
        },
      ],
    },
  },
};

export default item;
