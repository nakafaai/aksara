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
            "$$3.21\\text{ g}$$, $$0\\text{ cm}^3$$, $$4.21\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$2.75\\text{ g}$$, $$120\\text{ cm}^3$$, $$1.20\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$2.75\\text{ g}$$, $$120\\text{ cm}^3$$, $$3.61\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$2.75\\text{ g}$$, $$360\\text{ cm}^3$$, $$3.61\\times10^{22}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.21\\text{ g}$$, $$0\\text{ cm}^3$$, $$4.21\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$2.75\\text{ g}$$, $$120\\text{ cm}^3$$, $$1.20\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$2.75\\text{ g}$$, $$120\\text{ cm}^3$$, $$3.61\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$2.75\\text{ g}$$, $$360\\text{ cm}^3$$, $$3.61\\times10^{22}$$",
        },
      ],
    },
  },
};

export default item;
