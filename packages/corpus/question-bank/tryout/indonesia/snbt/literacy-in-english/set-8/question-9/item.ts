import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "cultivated-meat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Cultivated meat costs several times more than farmed chicken in shops.",
        },
        {
          correct: true,
          label:
            "Standard food reviews cannot detect the risks cultivated meat could pose.",
        },
        {
          correct: false,
          label:
            "Consumers in Singapore have bought cultivated chicken in a few restaurants since 2020.",
        },
        {
          correct: false,
          label:
            "Many traditional dishes were once considered strange new foods.",
        },
        {
          correct: false,
          label:
            "Labels on new foods are read by most shoppers before they buy them.",
        },
      ],
    },
  },
};

export default item;
