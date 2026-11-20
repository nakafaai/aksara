import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$20\\,\\Omega$$, $$5.0\\text{ W}$$ and $$280\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\Omega$$, $$5.0\\text{ W}$$ and $$170\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\Omega$$, $$7.8\\text{ W}$$ and $$180\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$2.0\\,\\Omega$$, $$5.0\\text{ W}$$ and $$280\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$20\\,\\Omega$$, $$5.0\\text{ W}$$ dan $$280\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\Omega$$, $$5.0\\text{ W}$$ dan $$170\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$20\\,\\Omega$$, $$7.8\\text{ W}$$ dan $$180\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$2.0\\,\\Omega$$, $$5.0\\text{ W}$$ dan $$280\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
