import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "bird-compass",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It showed that robins can see magnetic patterns in daylight but not at night.",
        },
        {
          correct: false,
          label:
            "It proved that aluminium screens help robins grow stronger iron-based magnets.",
        },
        {
          correct: false,
          label:
            "It showed that robins navigate better inside huts than they do in the open.",
        },
        {
          correct: true,
          label:
            "Noise too weak to affect a magnet disrupted the birds, and blocking it helped.",
        },
        {
          correct: false,
          label:
            "It found cryptochrome in the robins' beaks rather than in their retinas.",
        },
      ],
    },
  },
};

export default item;
