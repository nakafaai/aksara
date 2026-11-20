import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.50\\%$$, $$1.56\\text{ g}$$, $$3.96\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$15.6\\text{ g}$$, $$3.96\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$15.6\\text{ g}$$, $$39.6\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$15.6\\text{ g}$$, $$2.76\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.50\\%$$, $$1.56\\text{ g}$$, $$3.96\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$15.6\\text{ g}$$, $$3.96\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$15.6\\text{ g}$$, $$39.6\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$15.6\\text{ g}$$, $$2.76\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
