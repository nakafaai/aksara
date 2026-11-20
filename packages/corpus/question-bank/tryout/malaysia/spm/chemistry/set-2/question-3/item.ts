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
          label: "$$25.0\\%$$, $$23.8\\text{ g}$$, $$2.54\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$32.4\\text{ g}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$16.2\\text{ g}$$, $$0\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$23.8\\text{ g}$$, $$2.54\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25.0\\%$$, $$23.8\\text{ g}$$, $$2.54\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$32.4\\text{ g}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$16.2\\text{ g}$$, $$0\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$23.8\\text{ g}$$, $$2.54\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
