import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Two meeting places",
        },
        {
          correct: true,
          label: "An out-of-area contact",
        },
        {
          correct: false,
          label: "Every medical detail shared with the out-of-area contact",
        },
        {
          correct: false,
          label: "Unverified instructions for a medical device",
        },
      ],
    },
  },
  stimulus: "emergency-plan",
};

export default item;
