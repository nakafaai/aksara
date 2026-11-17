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
          label: "$$2.85\\text{ g}$$, $$0\\text{ g}$$, $$8.61\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.90\\text{ g}$$, $$0.240\\text{ g}$$, $$2.87\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$1.90\\text{ g}$$, $$0.240\\text{ g}$$, $$5.74\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.950\\text{ g}$$, $$0.480\\text{ g}$$, $$2.87\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.85\\text{ g}$$, $$0\\text{ g}$$, $$8.61\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.90\\text{ g}$$, $$0.240\\text{ g}$$, $$2.87\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$1.90\\text{ g}$$, $$0.240\\text{ g}$$, $$5.74\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.950\\text{ g}$$, $$0.480\\text{ g}$$, $$2.87\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
