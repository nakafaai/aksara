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
            "$$4.5\\times10^{-12}\\text{ J}$$ and $$2.3\\times10^{-12}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\times10^{-20}\\text{ J}$$ and $$3.8\\times10^{-21}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$ and $$1.1\\times10^{-12}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$ and $$1.8\\times10^{-11}\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$ dan $$2.3\\times10^{-12}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\times10^{-20}\\text{ J}$$ dan $$3.8\\times10^{-21}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$ dan $$1.1\\times10^{-12}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\times10^{-12}\\text{ J}$$ dan $$1.8\\times10^{-11}\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
