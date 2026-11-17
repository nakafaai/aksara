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
        { correct: false, label: "$$25\\%$$, $$100\\text{ cm}^3$$" },
        { correct: true, label: "$$50\\%$$, $$100\\text{ cm}^3$$" },
        { correct: false, label: "$$50\\%$$, $$50.0\\text{ cm}^3$$" },
        { correct: false, label: "$$100\\%$$, $$100\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$25\\%$$, $$100\\text{ cm}^3$$" },
        { correct: true, label: "$$50\\%$$, $$100\\text{ cm}^3$$" },
        { correct: false, label: "$$50\\%$$, $$50.0\\text{ cm}^3$$" },
        { correct: false, label: "$$100\\%$$, $$100\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
