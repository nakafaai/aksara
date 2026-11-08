import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "zoo-purpose",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "To illustrate that much of what visitors see is not conservation work",
        },
        {
          correct: false,
          label:
            "To show that meerkats and penguins are among the most endangered animals",
        },
        {
          correct: false,
          label:
            "To argue that families should stop visiting zoos at the weekend",
        },
        {
          correct: false,
          label:
            "To prove that small animals suffer more in captivity than large ones",
        },
        {
          correct: false,
          label:
            "To suggest that zoos should keep only meerkats and penguins in future",
        },
      ],
    },
  },
};

export default item;
