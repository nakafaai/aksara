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
            "$$525\\text{ Pa}$$, $$71.0\\text{ km h}^{-1}$$ and $$59.1\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$375\\text{ Pa}$$, $$60.0\\text{ km h}^{-1}$$ and $$49.9\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$106\\text{ km h}^{-1}$$ and $$75.3\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$71.0\\text{ km h}^{-1}$$ and $$95.2\\text{ km h}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$525\\text{ Pa}$$, $$71.0\\text{ km h}^{-1}$$ dan $$59.1\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$375\\text{ Pa}$$, $$60.0\\text{ km h}^{-1}$$ dan $$49.9\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$106\\text{ km h}^{-1}$$ dan $$75.3\\text{ km h}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$525\\text{ Pa}$$, $$71.0\\text{ km h}^{-1}$$ dan $$95.2\\text{ km h}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
