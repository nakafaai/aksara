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
        { correct: false, label: "$$8.80\\text{ g}$$, $$0\\text{ cm}^3$$" },
        { correct: false, label: "$$6.60\\text{ g}$$, $$200\\text{ cm}^3$$" },
        { correct: true, label: "$$6.60\\text{ g}$$, $$50.0\\text{ cm}^3$$" },
        { correct: false, label: "$$6.60\\text{ g}$$, $$25.0\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$8.80\\text{ g}$$, $$0\\text{ cm}^3$$" },
        { correct: false, label: "$$6.60\\text{ g}$$, $$200\\text{ cm}^3$$" },
        { correct: true, label: "$$6.60\\text{ g}$$, $$50.0\\text{ cm}^3$$" },
        { correct: false, label: "$$6.60\\text{ g}$$, $$25.0\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
