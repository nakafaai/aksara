import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.600\\text{ g}$$, $$20.0\\text{ cm}^3$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$0.600\\text{ g}$$, $$80.0\\text{ cm}^3$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$0.600\\text{ g}$$, $$80.0\\text{ cm}^3$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label:
            "$$0.600\\text{ g}$$, $$800\\text{ cm}^3$$, $$2.41\\times10^{22}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.600\\text{ g}$$, $$20.0\\text{ cm}^3$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$0.600\\text{ g}$$, $$80.0\\text{ cm}^3$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$0.600\\text{ g}$$, $$80.0\\text{ cm}^3$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label:
            "$$0.600\\text{ g}$$, $$800\\text{ cm}^3$$, $$2.41\\times10^{22}$$",
        },
      ],
    },
  },
};

export default item;
