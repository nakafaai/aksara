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
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ and $$6.4\\times10^{18}\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$ and $$6.4\\times10^{18}\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$5.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ and $$8.6\\times10^{18}\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$254\\text{ nm}$$ and $$6.4\\times10^{18}\\text{ s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ dan $$6.4\\times10^{18}\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$190\\text{ nm}$$ dan $$6.4\\times10^{18}\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$5.8\\times10^{-19}\\text{ J}$$, $$340\\text{ nm}$$ dan $$8.6\\times10^{18}\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$7.8\\times10^{-19}\\text{ J}$$, $$254\\text{ nm}$$ dan $$6.4\\times10^{18}\\text{ s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
