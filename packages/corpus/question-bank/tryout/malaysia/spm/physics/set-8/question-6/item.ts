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
          correct: false,
          label:
            "$$20\\text{ m}$$, $$2.2\\text{ s}$$ and $$13\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ m}$$, $$1.7\\text{ s}$$ and $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$20\\text{ m}$$, $$2.2\\text{ s}$$ and $$11\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ m}$$, $$2.2\\text{ s}$$ and $$11\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$20\\text{ m}$$, $$2.2\\text{ s}$$ dan $$13\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ m}$$, $$1.7\\text{ s}$$ dan $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$20\\text{ m}$$, $$2.2\\text{ s}$$ dan $$11\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ m}$$, $$2.2\\text{ s}$$ dan $$11\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
