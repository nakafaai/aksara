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
        { correct: false, label: "$$0.92\\text{ g}$$, $$60.0\\text{ cm}^3$$" },
        { correct: false, label: "$$1.38\\text{ g}$$, $$20.0\\text{ cm}^3$$" },
        { correct: true, label: "$$0.92\\text{ g}$$, $$20.0\\text{ cm}^3$$" },
        {
          correct: false,
          label:
            "$$0.92\\text{ g}$$, none, because all the sodium hydroxide reacts",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.92\\text{ g}$$, $$60.0\\text{ cm}^3$$" },
        { correct: false, label: "$$1.38\\text{ g}$$, $$20.0\\text{ cm}^3$$" },
        { correct: true, label: "$$0.92\\text{ g}$$, $$20.0\\text{ cm}^3$$" },
        {
          correct: false,
          label:
            "$$0.92\\text{ g}$$, tiada, kerana semua natrium hidroksida bertindak balas",
        },
      ],
    },
  },
};

export default item;
