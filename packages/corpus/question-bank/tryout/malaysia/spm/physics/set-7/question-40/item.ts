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
          label: "$$7.8\\times10^{-19}\\text{ J}$$ and $$340\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$7.8\\times10^{-19}\\text{ J}$$ and $$190\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$5.8\\times10^{-19}\\text{ J}$$ and $$340\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$7.8\\times10^{-19}\\text{ J}$$ and $$254\\text{ nm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7.8\\times10^{-19}\\text{ J}$$ dan $$340\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$7.8\\times10^{-19}\\text{ J}$$ dan $$190\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$5.8\\times10^{-19}\\text{ J}$$ dan $$340\\text{ nm}$$",
        },
        {
          correct: false,
          label: "$$7.8\\times10^{-19}\\text{ J}$$ dan $$254\\text{ nm}$$",
        },
      ],
    },
  },
};

export default item;
