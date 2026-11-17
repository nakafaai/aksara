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
          label: "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$ and $$3.0\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$ and $$12\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$ and $$4.2\\text{ h}$$",
        },
        {
          correct: true,
          label: "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$ and $$4.2\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$ dan $$3.0\\text{ j}$$",
        },
        {
          correct: false,
          label: "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$ dan $$12\\text{ j}$$",
        },
        {
          correct: false,
          label: "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$ dan $$4.2\\text{ j}$$",
        },
        {
          correct: true,
          label: "$$4.8\\times10^{3}\\text{ kg m}^{-3}$$ dan $$4.2\\text{ j}$$",
        },
      ],
    },
  },
};

export default item;
