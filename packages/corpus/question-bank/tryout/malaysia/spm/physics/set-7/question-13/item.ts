import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$348\\text{ m s}^{-1}$$, $$22.7\\text{ cm}$$ and $$3$$",
        },
        {
          correct: false,
          label: "$$317\\text{ m s}^{-1}$$, $$20.7\\text{ cm}$$ and $$3$$",
        },
        {
          correct: true,
          label: "$$348\\text{ m s}^{-1}$$, $$21.2\\text{ cm}$$ and $$3$$",
        },
        {
          correct: false,
          label: "$$348\\text{ m s}^{-1}$$, $$21.2\\text{ cm}$$ and $$2$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$348\\text{ m s}^{-1}$$, $$22.7\\text{ cm}$$ dan $$3$$",
        },
        {
          correct: false,
          label: "$$317\\text{ m s}^{-1}$$, $$20.7\\text{ cm}$$ dan $$3$$",
        },
        {
          correct: true,
          label: "$$348\\text{ m s}^{-1}$$, $$21.2\\text{ cm}$$ dan $$3$$",
        },
        {
          correct: false,
          label: "$$348\\text{ m s}^{-1}$$, $$21.2\\text{ cm}$$ dan $$2$$",
        },
      ],
    },
  },
};

export default item;
