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
          label: "$$3.52\\text{ g}$$, $$3.28\\text{ g}$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.52\\text{ g}$$, $$4.92\\text{ g}$$, $$2.76\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$5.28\\text{ g}$$, $$4.92\\text{ g}$$, $$2.76\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$3.52\\text{ g}$$, $$4.92\\text{ g}$$, $$1.84\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.52\\text{ g}$$, $$3.28\\text{ g}$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.52\\text{ g}$$, $$4.92\\text{ g}$$, $$2.76\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$5.28\\text{ g}$$, $$4.92\\text{ g}$$, $$2.76\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$3.52\\text{ g}$$, $$4.92\\text{ g}$$, $$1.84\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
