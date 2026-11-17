import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$76\\text{ cm}$$, $$10°$$ and $$7.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}$$, $$0.025°$$ and $$0.35\\text{ mm}$$",
        },
        {
          correct: true,
          label: "$$84\\text{ cm}$$, $$10°$$ and $$7.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}$$, $$10°$$ and $$0.40\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$76\\text{ cm}$$, $$10°$$ dan $$7.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}$$, $$0.025°$$ dan $$0.35\\text{ mm}$$",
        },
        {
          correct: true,
          label: "$$84\\text{ cm}$$, $$10°$$ dan $$7.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}$$, $$10°$$ dan $$0.40\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
