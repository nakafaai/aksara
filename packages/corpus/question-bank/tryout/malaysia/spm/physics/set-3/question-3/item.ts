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
          correct: true,
          label:
            "$$52\\text{ m}$$, $$13.2\\text{ m s}^{-2}$$, and about $$25\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$52\\text{ m}$$, $$8.7\\text{ m s}^{-2}$$, and about $$22\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ m}$$, $$11.3\\text{ m s}^{-2}$$, and about $$25\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$52\\text{ m}$$, $$13.2\\text{ m s}^{-2}$$, and about $$22\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$52\\text{ m}$$, $$13.2\\text{ m s}^{-2}$$, dan kira-kira $$25\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$52\\text{ m}$$, $$8.7\\text{ m s}^{-2}$$, dan kira-kira $$22\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ m}$$, $$11.3\\text{ m s}^{-2}$$, dan kira-kira $$25\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$52\\text{ m}$$, $$13.2\\text{ m s}^{-2}$$, dan kira-kira $$22\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
