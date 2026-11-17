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
            "$$4.95\\text{ MeV}$$, at $$1.5 \\times 10^7\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$4.86\\text{ MeV}$$, at $$1.5 \\times 10^7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.088\\text{ MeV}$$, at $$2.1 \\times 10^6\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$2.48\\text{ MeV}$$, at $$1.1 \\times 10^7\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.95\\text{ MeV}$$, pada $$1.5 \\times 10^7\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$4.86\\text{ MeV}$$, pada $$1.5 \\times 10^7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.088\\text{ MeV}$$, pada $$2.1 \\times 10^6\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$2.48\\text{ MeV}$$, pada $$1.1 \\times 10^7\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
