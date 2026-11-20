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
            "$$3.2\\text{ m s}^{-1}$$, $$12\\text{ cm}$$ and $$0.2\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$8.9\\text{ cm}$$ and $$1.8\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\text{ m s}^{-1}$$, $$11\\text{ cm}$$ and $$4.0\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$8.9\\text{ cm}$$ and $$5.8\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.2\\text{ m s}^{-1}$$, $$12\\text{ cm}$$ dan $$0.2\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$8.9\\text{ cm}$$ dan $$1.8\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\text{ m s}^{-1}$$, $$11\\text{ cm}$$ dan $$4.0\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ m s}^{-1}$$, $$8.9\\text{ cm}$$ dan $$5.8\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
