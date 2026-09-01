import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The date on the packet predicts exactly how many seeds will germinate at every checkpoint.",
        },
        {
          isCorrect: false,
          label:
            "The project becomes fantastic because students cooperate across years without meeting one another.",
        },
        {
          isCorrect: true,
          label:
            "An archive identifies the planned sequence, and each class records results it can directly observe.",
        },
        {
          isCorrect: false,
          label:
            "The project is realistic because every stored seed is guaranteed to remain viable through 2040.",
        },
        {
          isCorrect: false,
          label:
            "The final note turns the 2036 class into visitors who can answer Lea from the future.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
