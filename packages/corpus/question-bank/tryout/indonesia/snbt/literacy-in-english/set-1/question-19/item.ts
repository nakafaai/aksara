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
          label: "criticise historians for ignoring McLean's contribution.",
        },
        {
          correct: false,
          label: "suggest that the first containers were poorly designed.",
        },
        {
          correct: true,
          label:
            "sum up the contrast between the plain container and the complex arrangements its impact depended on.",
        },
        {
          correct: false,
          label:
            "introduce a new topic that the passage does not go on to discuss.",
        },
        {
          correct: false,
          label: "praise McLean as the single inventor of modern shipping.",
        },
      ],
    },
  },
};

export default item;
