import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_6$$, $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_8$$, $$110\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_8$$, $$50\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_8$$, $$60\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_6$$, $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_8$$, $$110\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_8$$, $$50\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_8$$, $$60\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
