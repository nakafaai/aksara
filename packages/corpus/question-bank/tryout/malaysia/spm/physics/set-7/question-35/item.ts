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
          label: "$$1.3\\times10^{7}\\text{ m s}^{-1}$$ and $$1000\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$9.4\\times10^{6}\\text{ m s}^{-1}$$ and $$2000\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.3\\times10^{7}\\text{ m s}^{-1}$$ and $$710\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$1.3\\times10^{7}\\text{ m s}^{-1}$$ and $$2000\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.3\\times10^{7}\\text{ m s}^{-1}$$ dan $$1000\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$9.4\\times10^{6}\\text{ m s}^{-1}$$ dan $$2000\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.3\\times10^{7}\\text{ m s}^{-1}$$ dan $$710\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$1.3\\times10^{7}\\text{ m s}^{-1}$$ dan $$2000\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
