import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "$$2.8\\text{ m s}^{-1}$$, $$1.6\\text{ m s}^{-1}$$ and $$6.5\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$2.8\\text{ m s}^{-1}$$, $$1.5\\text{ m s}^{-1}$$ and $$6.7\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$2.8\\text{ m s}^{-1}$$, $$1.9\\text{ m s}^{-1}$$ and $$5.9\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, it stops before the bumper, and $$15\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.8\\text{ m s}^{-1}$$, $$1.6\\text{ m s}^{-1}$$ dan $$6.5\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$2.8\\text{ m s}^{-1}$$, $$1.5\\text{ m s}^{-1}$$ dan $$6.7\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$2.8\\text{ m s}^{-1}$$, $$1.9\\text{ m s}^{-1}$$ dan $$5.9\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, ia berhenti sebelum penampan, dan $$15\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
