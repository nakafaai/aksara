import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "machine-pictures",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "To show that photographs are more creative than paintings",
        },
        {
          correct: false,
          label: "To argue that cameras should also be refused copyright",
        },
        {
          correct: true,
          label:
            "To reject the idea that a tool doing much work rules out authorship",
        },
        {
          correct: false,
          label: "To explain how image generators were first invented",
        },
        {
          correct: false,
          label:
            "To prove that a prompt also involves choosing the light and the camera angle",
        },
      ],
    },
  },
};

export default item;
