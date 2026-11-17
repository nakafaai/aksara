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
          correct: true,
          label: "$$0.125\\text{ mg}$$, and $$2.5 \\times 10^{18}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, and $$3.6 \\times 10^{17}$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ mg}$$, and $$1.9 \\times 10^{18}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, and $$2.9 \\times 10^{18}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.125\\text{ mg}$$, dan $$2.5 \\times 10^{18}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, dan $$3.6 \\times 10^{17}$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ mg}$$, dan $$1.9 \\times 10^{18}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, dan $$2.9 \\times 10^{18}$$",
        },
      ],
    },
  },
};

export default item;
