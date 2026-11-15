import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "tool-library",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}100{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}60{,}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}80{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}120{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}90{,}000$$",
        },
      ],
    },
  },
};

export default item;
