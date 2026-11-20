import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$525\\text{ Pa}$$, $$30\\text{ m s}^{-1}$$ and $$71\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$150\\text{ Pa}$$, $$16\\text{ m s}^{-1}$$ and $$38\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$21\\text{ m s}^{-1}$$ and $$50\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$30\\text{ m s}^{-1}$$ and $$107\\text{ km h}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$525\\text{ Pa}$$, $$30\\text{ m s}^{-1}$$ dan $$71\\text{ km j}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$150\\text{ Pa}$$, $$16\\text{ m s}^{-1}$$ dan $$38\\text{ km j}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$21\\text{ m s}^{-1}$$ dan $$50\\text{ km j}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$30\\text{ m s}^{-1}$$ dan $$107\\text{ km j}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
