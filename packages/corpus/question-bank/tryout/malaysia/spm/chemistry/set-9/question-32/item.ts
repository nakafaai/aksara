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
        { correct: false, label: "$$0\\text{ g}$$, $$720\\text{ cm}^3$$" },
        { correct: true, label: "$$0.50\\text{ g}$$, $$600\\text{ cm}^3$$" },
        { correct: false, label: "$$0\\text{ g}$$, $$1200\\text{ cm}^3$$" },
        { correct: false, label: "$$0.50\\text{ g}$$, $$1200\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0\\text{ g}$$, $$720\\text{ cm}^3$$" },
        { correct: true, label: "$$0.50\\text{ g}$$, $$600\\text{ cm}^3$$" },
        { correct: false, label: "$$0\\text{ g}$$, $$1200\\text{ cm}^3$$" },
        { correct: false, label: "$$0.50\\text{ g}$$, $$1200\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
