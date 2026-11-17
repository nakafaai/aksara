import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$3.0\\text{ h}$$ and $$3.0\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$12\\text{ h}$$ and $$0.75\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$ and $$2.1\\text{ km s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$ and $$2.1\\text{ km s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$3.0\\text{ h}$$ dan $$3.0\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$12\\text{ h}$$ dan $$0.75\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$ dan $$2.1\\text{ km s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$ dan $$2.1\\text{ km s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
