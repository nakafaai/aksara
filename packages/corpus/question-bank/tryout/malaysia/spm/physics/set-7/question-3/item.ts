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
            "$$12\\text{ m s}^{-1}$$, $$56\\text{ km h}^{-1}$$ and $$0\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$9.3\\text{ m s}^{-1}$$, $$56\\text{ km h}^{-1}$$ and $$58\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$12\\text{ m s}^{-1}$$, $$72\\text{ km h}^{-1}$$ and $$96\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ m s}^{-1}$$, $$72\\text{ km h}^{-1}$$ and $$144\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$12\\text{ m s}^{-1}$$, $$56\\text{ km j}^{-1}$$ dan $$0\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$9.3\\text{ m s}^{-1}$$, $$56\\text{ km j}^{-1}$$ dan $$58\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$12\\text{ m s}^{-1}$$, $$72\\text{ km j}^{-1}$$ dan $$96\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ m s}^{-1}$$, $$72\\text{ km j}^{-1}$$ dan $$144\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
