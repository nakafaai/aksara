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
        { correct: true, label: "$$2$$, $$3.74\\text{ g}$$" },
        { correct: false, label: "$$1$$, $$2.14\\text{ g}$$" },
        { correct: false, label: "$$2$$, $$2.14\\text{ g}$$" },
        { correct: false, label: "$$1$$, $$3.74\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$2$$, $$3.74\\text{ g}$$" },
        { correct: false, label: "$$1$$, $$2.14\\text{ g}$$" },
        { correct: false, label: "$$2$$, $$2.14\\text{ g}$$" },
        { correct: false, label: "$$1$$, $$3.74\\text{ g}$$" },
      ],
    },
  },
};

export default item;
