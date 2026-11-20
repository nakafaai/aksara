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
            "$$6.02\\times10^{21}$$, $$80.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.01\\times10^{22}$$, $$80.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$50.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$80.0\\text{ cm}^3$$, $$10.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.02\\times10^{21}$$, $$80.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.01\\times10^{22}$$, $$80.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$50.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$80.0\\text{ cm}^3$$, $$10.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
