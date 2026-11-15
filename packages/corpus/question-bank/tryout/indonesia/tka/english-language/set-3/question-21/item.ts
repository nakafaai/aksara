import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "dim-lights",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The people the union speaks for walk mostly along those roads.",
        },
        {
          correct: true,
          label:
            "The savings, about $$\\text{Rp}800$$ million a year, are too large to ignore.",
        },
        {
          correct: false,
          label: "Residential streets carry $$40\\%$$ of the lights.",
        },
        {
          correct: true,
          label: "That feeling matters.",
        },
        {
          correct: true,
          label: "Dimming is not a gamble.",
        },
      ],
    },
  },
};

export default item;
