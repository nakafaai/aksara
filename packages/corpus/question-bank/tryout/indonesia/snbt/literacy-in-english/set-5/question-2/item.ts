import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "continental-drift",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Wegener was a meteorologist rather than a geologist, and nearly every speaker at the 1926 symposium rejected drift.",
        },
        {
          correct: true,
          label:
            "Physicists showed that Wegener's proposed forces were far too feeble, and Jeffreys argued, correctly, that a continent could not plough through the ocean floor.",
        },
        {
          correct: false,
          label:
            "The coasts of South America and Africa fit together, and fossils of Glossopteris turn up on landmasses that oceans now separate.",
        },
        {
          correct: false,
          label:
            "Physicists showed that Wegener's proposed forces were far too feeble, and Wegener died in 1930 with his idea still a minority view.",
        },
        {
          correct: false,
          label:
            "No one had found a land bridge, and Jeffreys argued, correctly, that a continent could not plough through the ocean floor.",
        },
      ],
    },
  },
};

export default item;
