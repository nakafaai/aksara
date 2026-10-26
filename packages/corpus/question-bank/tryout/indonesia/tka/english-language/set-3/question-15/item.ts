import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The date on the packet predicts exactly how many seeds will germinate at every checkpoint.",
        },
        {
          correct: false,
          label:
            "The project becomes fantastic because students cooperate across years without meeting one another.",
        },
        {
          correct: true,
          label:
            "An archive identifies the planned sequence, and each class records results it can directly observe.",
        },
        {
          correct: false,
          label:
            "The project is realistic because every stored seed is guaranteed to remain viable through 2040.",
        },
        {
          correct: false,
          label:
            "The final note turns the 2036 class into visitors who can answer Lea from the future.",
        },
      ],
    },
  },
  stimulus: "future-seeds",
};

export default item;
