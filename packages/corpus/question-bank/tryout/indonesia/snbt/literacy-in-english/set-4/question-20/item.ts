import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "antikythera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Other ancient shipwrecks have yielded several devices built with similar gears.",
        },
        {
          correct: false,
          label:
            "Ancient writers may have described such machines, though no account names one.",
        },
        {
          correct: false,
          label:
            "The device's manual mentions a workshop that produced copies for sale.",
        },
        {
          correct: true,
          label:
            "Bronze was often melted down for reuse, so similar devices may simply be lost.",
        },
        {
          correct: false,
          label:
            "Medieval clocks were modelled on ancient devices that still survive today.",
        },
      ],
    },
  },
};

export default item;
