import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.62\\text{ m s}^{-1}$$, $$2.9\\text{ m s}^{-1}$$ and $$36$$",
        },
        {
          correct: true,
          label:
            "$$1.35\\text{ m s}^{-1}$$, $$2.9\\text{ m s}^{-1}$$ and $$36$$",
        },
        {
          correct: false,
          label:
            "$$1.35\\text{ m s}^{-1}$$, $$2.4\\text{ m s}^{-1}$$ and $$36$$",
        },
        {
          correct: false,
          label:
            "$$0.68\\text{ m s}^{-1}$$, $$2.9\\text{ m s}^{-1}$$ and $$72$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.62\\text{ m s}^{-1}$$, $$2.9\\text{ m s}^{-1}$$ dan $$36$$",
        },
        {
          correct: true,
          label:
            "$$1.35\\text{ m s}^{-1}$$, $$2.9\\text{ m s}^{-1}$$ dan $$36$$",
        },
        {
          correct: false,
          label:
            "$$1.35\\text{ m s}^{-1}$$, $$2.4\\text{ m s}^{-1}$$ dan $$36$$",
        },
        {
          correct: false,
          label:
            "$$0.68\\text{ m s}^{-1}$$, $$2.9\\text{ m s}^{-1}$$ dan $$72$$",
        },
      ],
    },
  },
};

export default item;
