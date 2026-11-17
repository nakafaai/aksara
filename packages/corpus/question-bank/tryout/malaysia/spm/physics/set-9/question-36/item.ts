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
          correct: false,
          label: "$$2.79\\text{ MeV}$$, and $$1.02\\text{ MeV}$$",
        },
        {
          correct: false,
          label: "$$2.79\\text{ MeV}$$, and $$1.40\\text{ MeV}$$",
        },
        {
          correct: false,
          label: "$$2.79\\text{ MeV}$$, and $$2.79\\text{ MeV}$$",
        },
        {
          correct: true,
          label: "$$2.79\\text{ MeV}$$, and $$1.78\\text{ MeV}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.79\\text{ MeV}$$, dan $$1.02\\text{ MeV}$$",
        },
        {
          correct: false,
          label: "$$2.79\\text{ MeV}$$, dan $$1.40\\text{ MeV}$$",
        },
        {
          correct: false,
          label: "$$2.79\\text{ MeV}$$, dan $$2.79\\text{ MeV}$$",
        },
        {
          correct: true,
          label: "$$2.79\\text{ MeV}$$, dan $$1.78\\text{ MeV}$$",
        },
      ],
    },
  },
};

export default item;
