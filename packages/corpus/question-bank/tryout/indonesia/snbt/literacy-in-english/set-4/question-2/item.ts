import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "otter-kelp",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It was a planned experiment in which otters were removed from chosen reefs and the results recorded.",
        },
        {
          correct: true,
          label:
            "It followed the same reefs before and after the otters vanished, so differences between islands could not explain the change.",
        },
        {
          correct: false,
          label:
            "It identified killer whales as the cause of the otter decline, which completed the chain of causes down to the kelp.",
        },
        {
          correct: false,
          label:
            "It showed the kelp thinning within a few years, which is too fast for any cause other than urchins to have acted.",
        },
        {
          correct: false,
          label:
            "It measured urchins by biomass rather than by number, which gave a more precise picture of how much they grazed.",
        },
      ],
    },
  },
};

export default item;
