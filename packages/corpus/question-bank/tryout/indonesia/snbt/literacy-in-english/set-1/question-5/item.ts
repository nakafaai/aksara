import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "mantis-shrimp",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Count the colour receptor types in several other species of mantis shrimp.",
        },
        {
          correct: false,
          label:
            "Test the same shrimp with the glowing fibres on many more target colours, spread across the whole range of their receptors.",
        },
        {
          correct: false,
          label:
            "Run the same fibre task with honeybees and butterflies and compare the scores.",
        },
        {
          correct: true,
          label:
            "Use moving, prey-like targets in the two colours and see whether much smaller gaps are then separated.",
        },
        {
          correct: false,
          label:
            "Time how quickly the shrimp strike when the two colours are very different.",
        },
      ],
    },
  },
};

export default item;
