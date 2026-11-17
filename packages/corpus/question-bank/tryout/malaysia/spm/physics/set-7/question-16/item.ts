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
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$ and $$0.86\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$1.2\\text{ s}$$ and $$0.86\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ m s}^{-1}$$, $$3.0\\text{ s}$$ and $$0.46\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$ and $$1.7\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$ dan $$0.86\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$1.2\\text{ s}$$ dan $$0.86\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ m s}^{-1}$$, $$3.0\\text{ s}$$ dan $$0.46\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$ dan $$1.7\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
