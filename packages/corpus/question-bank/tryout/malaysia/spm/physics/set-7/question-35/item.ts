import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$1000\\text{ V}$$ and $$7.5\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$9.4\\times10^{6}\\text{ m s}^{-1}$$, $$2000\\text{ V}$$ and $$11\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$2000\\text{ V}$$ and $$3.8\\text{ ns}$$",
        },
        {
          correct: true,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$2000\\text{ V}$$ and $$7.5\\text{ ns}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$1000\\text{ V}$$ dan $$7.5\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$9.4\\times10^{6}\\text{ m s}^{-1}$$, $$2000\\text{ V}$$ dan $$11\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$2000\\text{ V}$$ dan $$3.8\\text{ ns}$$",
        },
        {
          correct: true,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$2000\\text{ V}$$ dan $$7.5\\text{ ns}$$",
        },
      ],
    },
  },
};

export default item;
