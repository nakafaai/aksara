import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.53\\text{ m s}^{-2}$$, $$4.6\\text{ m s}^{-1}$$ and $$26^\\circ$$",
        },
        {
          correct: true,
          label:
            "$$0.53\\text{ m s}^{-2}$$, $$3.7\\text{ m s}^{-1}$$ and $$26^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\text{ m s}^{-2}$$, $$3.7\\text{ m s}^{-1}$$ and $$26^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$0.53\\text{ m s}^{-2}$$, $$3.7\\text{ m s}^{-1}$$ and $$64^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.53\\text{ m s}^{-2}$$, $$4.6\\text{ m s}^{-1}$$ dan $$26^\\circ$$",
        },
        {
          correct: true,
          label:
            "$$0.53\\text{ m s}^{-2}$$, $$3.7\\text{ m s}^{-1}$$ dan $$26^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\text{ m s}^{-2}$$, $$3.7\\text{ m s}^{-1}$$ dan $$26^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$0.53\\text{ m s}^{-2}$$, $$3.7\\text{ m s}^{-1}$$ dan $$64^\\circ$$",
        },
      ],
    },
  },
};

export default item;
