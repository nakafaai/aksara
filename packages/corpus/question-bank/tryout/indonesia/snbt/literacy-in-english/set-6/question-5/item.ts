import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "cholera-pump",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Closing the well ended the outbreak, as removing the pump handle ended the outbreak in 1854.",
        },
        {
          correct: false,
          label:
            "The fall shows that the well was the cause, because cases dropped within a week of the closure.",
        },
        {
          correct: true,
          label:
            "The fall alone does not show that the well was the cause, because cases may already have been falling as people left.",
        },
        {
          correct: false,
          label:
            "The fall alone does not show that the well was the cause, because only a comparison of two water companies could prove it.",
        },
        {
          correct: false,
          label:
            "The fall alone does not show that the well was the cause, because a map of the cases was not drawn.",
        },
      ],
    },
  },
};

export default item;
