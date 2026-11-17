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
          label: "$$35^\\circ$$, and $$0.26\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$35^\\circ$$, and $$0.40\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$35^\\circ$$, and $$0.35\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$38^\\circ$$, and $$0.35\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35^\\circ$$, dan $$0.26\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$35^\\circ$$, dan $$0.40\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$35^\\circ$$, dan $$0.35\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$38^\\circ$$, dan $$0.35\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
