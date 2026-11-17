import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$103\\text{ kJ}$$, $$21.4\\text{ dm}^3$$" },
        { correct: false, label: "$$82.5\\text{ kJ}$$, $$3.60\\text{ dm}^3$$" },
        { correct: false, label: "$$330\\text{ kJ}$$, $$17.1\\text{ dm}^3$$" },
        { correct: true, label: "$$82.5\\text{ kJ}$$, $$17.1\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$103\\text{ kJ}$$, $$21.4\\text{ dm}^3$$" },
        { correct: false, label: "$$82.5\\text{ kJ}$$, $$3.60\\text{ dm}^3$$" },
        { correct: false, label: "$$330\\text{ kJ}$$, $$17.1\\text{ dm}^3$$" },
        { correct: true, label: "$$82.5\\text{ kJ}$$, $$17.1\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
