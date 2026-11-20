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
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$7.6\\times10^{-4}\\text{ mol}$$, $$79$$ minutes and never",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$, $$7.6\\times10^{-4}\\text{ mol}$$, $$79$$ minutes and never",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$7.6\\times10^{-4}\\text{ mol}$$, $$79$$ minutes and $$55$$ minutes",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$3.8\\times10^{-2}\\text{ mol}$$, $$1.6$$ minutes and never",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$7.6\\times10^{-4}\\text{ mol}$$, $$79$$ minit dan tidak akan berlaku",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$, $$7.6\\times10^{-4}\\text{ mol}$$, $$79$$ minit dan tidak akan berlaku",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$7.6\\times10^{-4}\\text{ mol}$$, $$79$$ minit dan $$55$$ minit",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$, $$3.8\\times10^{-2}\\text{ mol}$$, $$1.6$$ minit dan tidak akan berlaku",
        },
      ],
    },
  },
};

export default item;
