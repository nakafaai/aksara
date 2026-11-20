import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\times10^{-15}\\text{ J}$$, $$2.5\\times10^{-4}\\text{ W}$$ and $$31$$ years",
        },
        {
          correct: false,
          label:
            "$$3.0\\times10^{-15}\\text{ J}$$, $$2.3\\times10^{-4}\\text{ W}$$ and $$37$$ years",
        },
        {
          correct: true,
          label:
            "$$3.0\\times10^{-15}\\text{ J}$$, $$2.3\\times10^{-4}\\text{ W}$$ and $$31$$ years",
        },
        {
          correct: false,
          label:
            "$$1.0\\times10^{-23}\\text{ J}$$, $$7.8\\times10^{-13}\\text{ W}$$ and $$31$$ years",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\times10^{-15}\\text{ J}$$, $$2.5\\times10^{-4}\\text{ W}$$ dan $$31$$ tahun",
        },
        {
          correct: false,
          label:
            "$$3.0\\times10^{-15}\\text{ J}$$, $$2.3\\times10^{-4}\\text{ W}$$ dan $$37$$ tahun",
        },
        {
          correct: true,
          label:
            "$$3.0\\times10^{-15}\\text{ J}$$, $$2.3\\times10^{-4}\\text{ W}$$ dan $$31$$ tahun",
        },
        {
          correct: false,
          label:
            "$$1.0\\times10^{-23}\\text{ J}$$, $$7.8\\times10^{-13}\\text{ W}$$ dan $$31$$ tahun",
        },
      ],
    },
  },
};

export default item;
