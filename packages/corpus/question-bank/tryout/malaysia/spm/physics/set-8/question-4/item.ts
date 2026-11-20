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
            "$$3.0\\text{ m s}^{-1}$$, $$2.1\\text{ m s}^{-1}$$ and $$4.0\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$1.1\\text{ m s}^{-1}$$ and $$1.8\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$2.4\\text{ m s}^{-1}$$, $$0$$ and $$5.8\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$1.1\\text{ m s}^{-1}$$ and $$5.8\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\text{ m s}^{-1}$$, $$2.1\\text{ m s}^{-1}$$ dan $$4.0\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$1.1\\text{ m s}^{-1}$$ dan $$1.8\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$2.4\\text{ m s}^{-1}$$, $$0$$ dan $$5.8\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$1.1\\text{ m s}^{-1}$$ dan $$5.8\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
