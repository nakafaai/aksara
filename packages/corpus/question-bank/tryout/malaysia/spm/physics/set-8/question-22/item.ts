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
            "$$3.54\\text{ m s}^{-1}$$, $$2.74\\text{ m s}^{-1}$$ and $$6.93\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$3.50\\text{ m s}^{-1}$$, $$2.69\\text{ m s}^{-1}$$ and $$7.03\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$3.50\\text{ m s}^{-1}$$, $$2.69\\text{ m s}^{-1}$$ and $$6.43\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$3.50\\text{ m s}^{-1}$$, $$2.87\\text{ m s}^{-1}$$ and $$7.03\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.54\\text{ m s}^{-1}$$, $$2.74\\text{ m s}^{-1}$$ dan $$6.93\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$3.50\\text{ m s}^{-1}$$, $$2.69\\text{ m s}^{-1}$$ dan $$7.03\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$3.50\\text{ m s}^{-1}$$, $$2.69\\text{ m s}^{-1}$$ dan $$6.43\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$3.50\\text{ m s}^{-1}$$, $$2.87\\text{ m s}^{-1}$$ dan $$7.03\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
