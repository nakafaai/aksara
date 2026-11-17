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
          correct: true,
          label:
            "$$5.7\\text{ m s}^{-2}$$, $$16\\text{ m s}^{-1}$$ and $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-2}$$, $$19\\text{ m s}^{-1}$$ and $$20\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$5.7\\text{ m s}^{-2}$$, $$15\\text{ m s}^{-1}$$ and $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$5.7\\text{ m s}^{-2}$$, $$16\\text{ m s}^{-1}$$ and $$24\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$5.7\\text{ m s}^{-2}$$, $$16\\text{ m s}^{-1}$$ dan $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m s}^{-2}$$, $$19\\text{ m s}^{-1}$$ dan $$20\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$5.7\\text{ m s}^{-2}$$, $$15\\text{ m s}^{-1}$$ dan $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$5.7\\text{ m s}^{-2}$$, $$16\\text{ m s}^{-1}$$ dan $$24\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
