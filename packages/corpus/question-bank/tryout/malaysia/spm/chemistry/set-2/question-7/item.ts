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
            "$$1.20\\times10^{22}$$, $$6.99\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.01\\times10^{22}$$, $$6.99\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$2.33\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$6.99\\text{ g}$$, $$20.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$6.99\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.01\\times10^{22}$$, $$6.99\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$2.33\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.01\\times10^{22}$$, $$6.99\\text{ g}$$, $$20.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
