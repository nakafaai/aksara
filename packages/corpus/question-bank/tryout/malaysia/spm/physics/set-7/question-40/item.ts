import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$7.7\\times10^{-4}\\text{ mol}$$ and $$78$$ minutes",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$, $$7.7\\times10^{-4}\\text{ mol}$$ and $$78$$ minutes",
        },
        {
          correct: false,
          label:
            "$$5.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$1.0\\times10^{-3}\\text{ mol}$$ and $$60$$ minutes",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$3.8\\times10^{-2}\\text{ mol}$$ and $$1.6$$ minutes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$7.7\\times10^{-4}\\text{ mol}$$ dan $$78$$ minit",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$, $$7.7\\times10^{-4}\\text{ mol}$$ dan $$78$$ minit",
        },
        {
          correct: false,
          label:
            "$$5.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$1.0\\times10^{-3}\\text{ mol}$$ dan $$60$$ minit",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$3.8\\times10^{-2}\\text{ mol}$$ dan $$1.6$$ minit",
        },
      ],
    },
  },
};

export default item;
