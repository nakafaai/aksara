import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{CH}_2\\text{O}$$, $$720\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$, $$720\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$, $$1080\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{CH}_2\\text{O}$$, $$720\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$, $$720\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$, $$1080\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
