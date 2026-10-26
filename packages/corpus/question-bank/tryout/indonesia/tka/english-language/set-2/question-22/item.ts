import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The passage lists three initial checking steps.",
        },
        {
          correct: false,
          label: "Medical advice is named as a higher-risk example.",
        },
        {
          correct: true,
          label:
            "Treating source checking as a task only for language or computer classes is unrealistic.",
        },
        {
          correct: false,
          label: "Geography is mentioned in the fourth paragraph.",
        },
        {
          correct: false,
          label: "The routine includes a stopping rule.",
        },
      ],
    },
  },
  stimulus: "source-checking",
};

export default item;
