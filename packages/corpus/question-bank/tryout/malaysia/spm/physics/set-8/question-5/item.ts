import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ and $$25\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$98\\text{ W}$$ and $$11\\text{ min}$$",
        },
        {
          correct: true,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$49\\text{ W}$$ and $$22\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$49\\text{ W}$$ and $$44\\text{ min}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ dan $$25\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$98\\text{ W}$$ dan $$11\\text{ min}$$",
        },
        {
          correct: true,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$49\\text{ W}$$ dan $$22\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$49\\text{ W}$$ dan $$44\\text{ min}$$",
        },
      ],
    },
  },
};

export default item;
