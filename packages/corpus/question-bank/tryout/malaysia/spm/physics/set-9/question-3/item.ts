import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.7\\text{ s}$$, and it gets fully past after $$60\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ s}$$, and it gets only $$125\\text{ m}$$ along, then falls back",
        },
        {
          correct: true,
          label:
            "$$6.7\\text{ s}$$, and it gets only $$125\\text{ m}$$ along, then falls back",
        },
        {
          correct: false,
          label:
            "$$6.7\\text{ s}$$, and it gets only $$250\\text{ m}$$ along, then falls back",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.7\\text{ s}$$, dan ia melepasi sepenuhnya selepas $$60\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ s}$$, dan ia hanya maju $$125\\text{ m}$$, kemudian tertinggal semula",
        },
        {
          correct: true,
          label:
            "$$6.7\\text{ s}$$, dan ia hanya maju $$125\\text{ m}$$, kemudian tertinggal semula",
        },
        {
          correct: false,
          label:
            "$$6.7\\text{ s}$$, dan ia hanya maju $$250\\text{ m}$$, kemudian tertinggal semula",
        },
      ],
    },
  },
};

export default item;
