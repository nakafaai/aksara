import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.40\\text{ g}$$, $$3.00\\text{ g}$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$6.16\\text{ g}$$, $$1.80\\text{ g}$$, $$4.21\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$3.08\\text{ g}$$, $$3.00\\text{ g}$$, $$2.11\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$3.08\\text{ g}$$, $$3.90\\text{ g}$$, $$2.11\\times10^{22}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.40\\text{ g}$$, $$3.00\\text{ g}$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$6.16\\text{ g}$$, $$1.80\\text{ g}$$, $$4.21\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$3.08\\text{ g}$$, $$3.00\\text{ g}$$, $$2.11\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$3.08\\text{ g}$$, $$3.90\\text{ g}$$, $$2.11\\times10^{22}$$",
        },
      ],
    },
  },
};

export default item;
