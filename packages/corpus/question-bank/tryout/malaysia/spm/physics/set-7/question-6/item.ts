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
            "$$9.8\\text{ m s}^{-2}$$, $$0.15\\text{ s}$$ and $$49\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$9.8\\text{ m s}^{-2}$$, $$0.15\\text{ s}$$ and $$54\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$9.8\\text{ m s}^{-2}$$, $$0.20\\text{ s}$$ and $$49\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$9.8\\text{ m s}^{-2}$$, $$0.15\\text{ s}$$ and $$59\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$9.8\\text{ m s}^{-2}$$, $$0.15\\text{ s}$$ dan $$49\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$9.8\\text{ m s}^{-2}$$, $$0.15\\text{ s}$$ dan $$54\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$9.8\\text{ m s}^{-2}$$, $$0.20\\text{ s}$$ dan $$49\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$9.8\\text{ m s}^{-2}$$, $$0.15\\text{ s}$$ dan $$59\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
