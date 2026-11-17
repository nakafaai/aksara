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
            "$$4.5\\times10^{-12}\\text{ J}$$, $$2.3\\times10^{-12}\\text{ J}$$ and $$6.8\\times10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\times10^{-20}\\text{ J}$$, $$3.8\\times10^{-21}\\text{ J}$$ and $$2.3\\times10^{3}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$, $$1.1\\times10^{-12}\\text{ J}$$ and $$6.8\\times10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$, $$1.8\\times10^{-11}\\text{ J}$$ and $$2.7\\times10^{12}\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$, $$2.3\\times10^{-12}\\text{ J}$$ dan $$6.8\\times10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\times10^{-20}\\text{ J}$$, $$3.8\\times10^{-21}\\text{ J}$$ dan $$2.3\\times10^{3}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$, $$1.1\\times10^{-12}\\text{ J}$$ dan $$6.8\\times10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$, $$1.8\\times10^{-11}\\text{ J}$$ dan $$2.7\\times10^{12}\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
