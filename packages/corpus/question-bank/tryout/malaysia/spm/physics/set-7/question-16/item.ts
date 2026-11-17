import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.0\\text{ m s}^{-1}$$ and $$6.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ m s}^{-1}$$ and $$1.2\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ m s}^{-1}$$ and $$3.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ m s}^{-1}$$ and $$2.0\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.0\\text{ m s}^{-1}$$ dan $$6.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ m s}^{-1}$$ dan $$1.2\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ m s}^{-1}$$ dan $$3.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ m s}^{-1}$$ dan $$2.0\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
