import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "zoo-purpose",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Many visitors say that elephants are their favourite animals at the zoo by far.",
        },
        {
          correct: false,
          label:
            "Elephants in the wild walk long distances every day in search of food.",
        },
        {
          correct: false,
          label:
            "Zoos spend a large share of their budgets on elephant and polar bear enclosures.",
        },
        {
          correct: false,
          label:
            "Polar bears in the wild are threatened by the loss of sea ice.",
        },
        {
          correct: true,
          label:
            "Elephants in good enclosures show no more stress than wild elephants.",
        },
      ],
    },
  },
};

export default item;
