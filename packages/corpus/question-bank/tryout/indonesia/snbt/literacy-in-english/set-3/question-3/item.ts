import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "mpemba-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lab P has confirmed the Mpemba effect, so Lab Q must have timed its cups wrongly.",
        },
        {
          correct: false,
          label:
            "Both labs may be right, because reaching zero first and freezing solid first are different events.",
        },
        {
          correct: true,
          label:
            "The disagreement may come from where the thermometers sat, so neither result shows on its own that the effect is real.",
        },
        {
          correct: false,
          label:
            "The disagreement may come from supercooling, which can leave one cup liquid below zero while the other freezes.",
        },
        {
          correct: false,
          label:
            "Hot water reaches zero first only near the bottom of a cup, so Lab Q measured in the wrong place.",
        },
      ],
    },
  },
};

export default item;
