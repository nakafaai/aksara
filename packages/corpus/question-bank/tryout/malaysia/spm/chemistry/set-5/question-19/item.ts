import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$30\\text{ s}$$, $$96\\text{ cm}^3$$" },
        { correct: false, label: "$$60\\text{ s}$$, $$96\\text{ cm}^3$$" },
        { correct: false, label: "$$15\\text{ s}$$, $$48\\text{ cm}^3$$" },
        { correct: false, label: "$$30\\text{ s}$$, $$48\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$30\\text{ s}$$, $$96\\text{ cm}^3$$" },
        { correct: false, label: "$$60\\text{ s}$$, $$96\\text{ cm}^3$$" },
        { correct: false, label: "$$15\\text{ s}$$, $$48\\text{ cm}^3$$" },
        { correct: false, label: "$$30\\text{ s}$$, $$48\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
