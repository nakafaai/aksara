import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "half-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It shows that ducks sleep better when they are surrounded by other ducks.",
        },
        {
          correct: true,
          label:
            "It shows that the behaviour changes with how exposed a duck is.",
        },
        {
          correct: false,
          label:
            "It proves that ducks at the ends were older than ducks in the middle.",
        },
        {
          correct: false,
          label:
            "It allows the researchers to count how many ducks were in the row.",
        },
        {
          correct: false,
          label:
            "It suggests that ducks in the middle might never sleep at all.",
        },
      ],
    },
  },
};

export default item;
