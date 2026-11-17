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
          label: "$$130\\text{ s}$$, and $$21.7\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$130\\text{ s}$$, and $$23.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ s}$$, and $$16.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$160\\text{ s}$$, and $$26.7\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$130\\text{ s}$$, dan $$21.7\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$130\\text{ s}$$, dan $$23.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ s}$$, dan $$16.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$160\\text{ s}$$, dan $$26.7\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
