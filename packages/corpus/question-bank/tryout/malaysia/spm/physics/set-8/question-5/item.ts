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
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ and $$32\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$85\\text{ W}$$ and $$98\\text{ W}$$",
        },
        {
          correct: true,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ and $$49\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ and $$42\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ dan $$32\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$85\\text{ W}$$ dan $$98\\text{ W}$$",
        },
        {
          correct: true,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ dan $$49\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ m s}^{-1}$$, $$42\\text{ W}$$ dan $$42\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
