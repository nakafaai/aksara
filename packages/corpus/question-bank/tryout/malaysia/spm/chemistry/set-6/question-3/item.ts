import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$, $$\\text{S}^{2-}<\\text{Cl}^-<\\text{K}^+<\\text{Ca}^{2+}$$",
        },
        {
          correct: true,
          label:
            "$$3.61\\times10^{22}$$, $$\\text{Ca}^{2+}<\\text{K}^+<\\text{Cl}^-<\\text{S}^{2-}$$",
        },
        {
          correct: false,
          label:
            "$$2.41\\times10^{22}$$, $$\\text{Ca}^{2+}<\\text{K}^+<\\text{Cl}^-<\\text{S}^{2-}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$\\text{Ca}^{2+}<\\text{K}^+<\\text{Cl}^-<\\text{S}^{2-}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$, $$\\text{S}^{2-}<\\text{Cl}^-<\\text{K}^+<\\text{Ca}^{2+}$$",
        },
        {
          correct: true,
          label:
            "$$3.61\\times10^{22}$$, $$\\text{Ca}^{2+}<\\text{K}^+<\\text{Cl}^-<\\text{S}^{2-}$$",
        },
        {
          correct: false,
          label:
            "$$2.41\\times10^{22}$$, $$\\text{Ca}^{2+}<\\text{K}^+<\\text{Cl}^-<\\text{S}^{2-}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$\\text{Ca}^{2+}<\\text{K}^+<\\text{Cl}^-<\\text{S}^{2-}$$",
        },
      ],
    },
  },
};

export default item;
