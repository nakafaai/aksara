import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "glacier-flow",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "To show that the middle of a glacier moves faster than its edges",
        },
        {
          correct: false,
          label: "To prove that glaciers move faster in summer than in winter",
        },
        {
          correct: false,
          label: "To explain how fresh snow is slowly turned into dense ice",
        },
        {
          correct: false,
          label:
            "To show that the researchers were able to measure Greenland's glaciers",
        },
        {
          correct: false,
          label:
            "To argue that a retreating glacier is really flowing backwards",
        },
      ],
    },
  },
};

export default item;
