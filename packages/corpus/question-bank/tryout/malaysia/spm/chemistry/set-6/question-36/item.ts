import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$46.7\\text{ s}$$, $$144\\text{ dm}^3$$" },
        { correct: false, label: "$$117\\text{ s}$$, $$144\\text{ dm}^3$$" },
        { correct: false, label: "$$46.7\\text{ s}$$, $$34.3\\text{ dm}^3$$" },
        { correct: false, label: "$$46.7\\text{ s}$$, $$7.20\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$46.7\\text{ s}$$, $$144\\text{ dm}^3$$" },
        { correct: false, label: "$$117\\text{ s}$$, $$144\\text{ dm}^3$$" },
        { correct: false, label: "$$46.7\\text{ s}$$, $$34.3\\text{ dm}^3$$" },
        { correct: false, label: "$$46.7\\text{ s}$$, $$7.20\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
