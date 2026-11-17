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
          label: "$$25\\text{ m s}^{-1}$$, and $$25\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$30\\text{ m s}^{-1}$$, and $$25\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ m s}^{-1}$$, and $$25\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ m s}^{-1}$$, and $$15\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\text{ m s}^{-1}$$, dan $$25\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$30\\text{ m s}^{-1}$$, dan $$25\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ m s}^{-1}$$, dan $$25\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ m s}^{-1}$$, dan $$15\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
