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
          correct: false,
          label: "$$2.0\\text{ m s}^{-1}$$ and $$-2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$0.5\\text{ m s}^{-1}$$ and $$+2\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$2.0\\text{ m s}^{-1}$$ and $$+2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ m s}^{-1}$$ and $$0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.0\\text{ m s}^{-1}$$ dan $$-2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$0.5\\text{ m s}^{-1}$$ dan $$+2\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$2.0\\text{ m s}^{-1}$$ dan $$+2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ m s}^{-1}$$ dan $$0$$",
        },
      ],
    },
  },
};

export default item;
