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
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ and $$7.7\\times10^{-4}\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$ and $$7.7\\times10^{-4}\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "$$5.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ and $$1.0\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ and $$3.8\\times10^{-2}\\text{ mol}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ dan $$7.7\\times10^{-4}\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$ dan $$7.7\\times10^{-4}\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "$$5.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ dan $$1.0\\times10^{-3}\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ dan $$3.8\\times10^{-2}\\text{ mol}$$",
        },
      ],
    },
  },
};

export default item;
