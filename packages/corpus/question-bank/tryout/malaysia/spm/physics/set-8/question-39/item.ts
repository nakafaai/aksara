import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.6\\times10^{7}\\text{ m s}^{-1}$$, $$0.10\\text{ MeV}$$ and $$5.4\\text{ MeV}$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{7}\\text{ m s}^{-1}$$, $$0\\text{ MeV}$$ and $$5.3\\text{ MeV}$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{7}\\text{ m s}^{-1}$$, $$5.3\\text{ MeV}$$ and $$10.6\\text{ MeV}$$",
        },
        {
          correct: false,
          label:
            "$$1.1\\times10^{7}\\text{ m s}^{-1}$$, $$0.10\\text{ MeV}$$ and $$5.4\\text{ MeV}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.6\\times10^{7}\\text{ m s}^{-1}$$, $$0.10\\text{ MeV}$$ dan $$5.4\\text{ MeV}$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{7}\\text{ m s}^{-1}$$, $$0\\text{ MeV}$$ dan $$5.3\\text{ MeV}$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{7}\\text{ m s}^{-1}$$, $$5.3\\text{ MeV}$$ dan $$10.6\\text{ MeV}$$",
        },
        {
          correct: false,
          label:
            "$$1.1\\times10^{7}\\text{ m s}^{-1}$$, $$0.10\\text{ MeV}$$ dan $$5.4\\text{ MeV}$$",
        },
      ],
    },
  },
};

export default item;
