import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.710\\text{ mm}$$, $$4.8\\times10^{-7}\\,\\Omega\\text{ m}$$ and $$0.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$2.0\\times10^{-6}\\,\\Omega\\text{ m}$$ and $$0.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ and $$0.35\\%$$",
        },
        {
          correct: true,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ and $$0.7\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.710\\text{ mm}$$, $$4.8\\times10^{-7}\\,\\Omega\\text{ m}$$ dan $$0.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$2.0\\times10^{-6}\\,\\Omega\\text{ m}$$ dan $$0.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ dan $$0.35\\%$$",
        },
        {
          correct: true,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ dan $$0.7\\%$$",
        },
      ],
    },
  },
};

export default item;
