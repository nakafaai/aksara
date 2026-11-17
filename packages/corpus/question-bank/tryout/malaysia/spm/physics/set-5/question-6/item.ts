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
          label: "$$2.25\\text{ m s}^{-2}$$, and about $$24\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ m s}^{-2}$$, and about $$16\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$1.75\\text{ m s}^{-2}$$, and about $$22\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ m s}^{-2}$$, and about $$18\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.25\\text{ m s}^{-2}$$, dan kira-kira $$24\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ m s}^{-2}$$, dan kira-kira $$16\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$1.75\\text{ m s}^{-2}$$, dan kira-kira $$22\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ m s}^{-2}$$, dan kira-kira $$18\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
