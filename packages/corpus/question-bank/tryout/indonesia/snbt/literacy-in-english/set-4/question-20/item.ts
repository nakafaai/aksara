import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "antikythera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Many similar devices have been found in other ancient shipwrecks.",
        },
        {
          correct: false,
          label:
            "Ancient writers described hundreds of such machines in detail.",
        },
        {
          correct: false,
          label:
            "The mechanism's manual mentions a factory that produced copies.",
        },
        {
          correct: true,
          label:
            "Bronze was valuable and often melted down, so other examples may have been lost.",
        },
        {
          correct: false,
          label:
            "Medieval clocks were based on several ancient devices that survive today.",
        },
      ],
    },
  },
};

export default item;
