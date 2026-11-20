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
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$, $$0.86\\text{ s}$$ and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$1.2\\text{ s}$$, $$0.86\\text{ s}$$ and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ m s}^{-1}$$, $$3.0\\text{ s}$$, $$0.46\\text{ s}$$ and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$, $$1.7\\text{ s}$$ and $$9.0\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$, $$0.86\\text{ s}$$ dan $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$1.2\\text{ s}$$, $$0.86\\text{ s}$$ dan $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ m s}^{-1}$$, $$3.0\\text{ s}$$, $$0.46\\text{ s}$$ dan $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-1}$$, $$6.0\\text{ s}$$, $$1.7\\text{ s}$$ dan $$9.0\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
