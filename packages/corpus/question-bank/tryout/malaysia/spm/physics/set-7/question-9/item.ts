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
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$3.0\\text{ h}$$, $$3.0\\text{ km s}^{-1}$$ and $$3.5\\times10^{23}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$12\\text{ h}$$, $$0.75\\text{ km s}^{-1}$$ and $$3.5\\times10^{23}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$, $$2.1\\text{ km s}^{-1}$$ and $$8.7\\times10^{22}\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$, $$2.1\\text{ km s}^{-1}$$ and $$3.5\\times10^{23}\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$3.0\\text{ h}$$, $$3.0\\text{ km s}^{-1}$$ dan $$3.5\\times10^{23}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$12\\text{ h}$$, $$0.75\\text{ km s}^{-1}$$ dan $$3.5\\times10^{23}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$, $$2.1\\text{ km s}^{-1}$$ dan $$8.7\\times10^{22}\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$, $$4.2\\text{ h}$$, $$2.1\\text{ km s}^{-1}$$ dan $$3.5\\times10^{23}\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
