import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "structure",
  },
  stimulus: "shipping-container",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "criticise historians for ignoring McLean's contribution to shipping.",
        },
        {
          correct: false,
          label:
            "suggest that the first containers were poorly designed and built.",
        },
        {
          correct: true,
          label:
            "sum up the contrast between a simple box and the complex system around it.",
        },
        {
          correct: false,
          label:
            "introduce a new topic that the passage does not go on to discuss.",
        },
        {
          correct: false,
          label:
            "praise McLean as the single inventor of modern container shipping.",
        },
      ],
    },
  },
};

export default item;
