import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.58\\text{ g}$$, $$25.0\\text{ cm}^3$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$25.0\\text{ cm}^3$$" },
        { correct: false, label: "$$1.58\\text{ g}$$, $$12.5\\text{ cm}^3$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$12.5\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.58\\text{ g}$$, $$25.0\\text{ cm}^3$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$25.0\\text{ cm}^3$$" },
        { correct: false, label: "$$1.58\\text{ g}$$, $$12.5\\text{ cm}^3$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$12.5\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
