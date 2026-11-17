import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.2\\text{ m s}^{-1}$$, and $$2.2\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$2.2\\text{ m s}^{-1}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ m s}^{-1}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.2\\text{ m s}^{-1}$$, and $$1.0\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.2\\text{ m s}^{-1}$$, dan $$2.2\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$2.2\\text{ m s}^{-1}$$, dan $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ m s}^{-1}$$, dan $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.2\\text{ m s}^{-1}$$, dan $$1.0\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
