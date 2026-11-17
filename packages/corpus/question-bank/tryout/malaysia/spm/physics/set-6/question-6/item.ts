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
          label: "$$1.1\\text{ s}$$, and $$8.1\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$6.6\\text{ s}$$, and $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$3.3\\text{ s}$$, and $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$6.6\\text{ s}$$, and $$5.5\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.1\\text{ s}$$, dan $$8.1\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$6.6\\text{ s}$$, dan $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$3.3\\text{ s}$$, dan $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$6.6\\text{ s}$$, dan $$5.5\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
