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
            "$$0.710\\text{ mm}$$, $$4.7\\times10^{-7}\\,\\Omega\\text{ m}$$ and $$57$$ turns",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$2.0\\times10^{-6}\\,\\Omega\\text{ m}$$ and $$56$$ turns",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ and $$28$$ turns",
        },
        {
          correct: true,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ and $$56$$ turns",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.710\\text{ mm}$$, $$4.7\\times10^{-7}\\,\\Omega\\text{ m}$$ dan $$57$$ lilitan",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$2.0\\times10^{-6}\\,\\Omega\\text{ m}$$ dan $$56$$ lilitan",
        },
        {
          correct: false,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ dan $$28$$ lilitan",
        },
        {
          correct: true,
          label:
            "$$0.720\\text{ mm}$$, $$4.9\\times10^{-7}\\,\\Omega\\text{ m}$$ dan $$56$$ lilitan",
        },
      ],
    },
  },
};

export default item;
