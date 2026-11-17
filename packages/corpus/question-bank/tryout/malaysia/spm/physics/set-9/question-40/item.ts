import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$0.50\\text{ eV}$$",
        },
        {
          correct: true,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$1.8\\text{ eV}$$",
        },
        {
          correct: false,
          label: "$$4.1 \\times 10^{-15}\\text{ J s}$$, and $$1.8\\text{ eV}$$",
        },
        {
          correct: false,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$2.3\\text{ eV}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$0.50\\text{ eV}$$",
        },
        {
          correct: true,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$1.8\\text{ eV}$$",
        },
        {
          correct: false,
          label: "$$4.1 \\times 10^{-15}\\text{ J s}$$, dan $$1.8\\text{ eV}$$",
        },
        {
          correct: false,
          label: "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$2.3\\text{ eV}$$",
        },
      ],
    },
  },
};

export default item;
