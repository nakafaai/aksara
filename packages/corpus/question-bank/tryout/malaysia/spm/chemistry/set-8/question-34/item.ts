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
        { correct: false, label: "$$330\\text{ kJ}$$, $$4.80\\text{ g}$$" },
        { correct: false, label: "$$82.5\\text{ kJ}$$, $$16.0\\text{ g}$$" },
        { correct: false, label: "$$41.3\\text{ kJ}$$, $$4.80\\text{ g}$$" },
        { correct: true, label: "$$82.5\\text{ kJ}$$, $$4.80\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$330\\text{ kJ}$$, $$4.80\\text{ g}$$" },
        { correct: false, label: "$$82.5\\text{ kJ}$$, $$16.0\\text{ g}$$" },
        { correct: false, label: "$$41.3\\text{ kJ}$$, $$4.80\\text{ g}$$" },
        { correct: true, label: "$$82.5\\text{ kJ}$$, $$4.80\\text{ g}$$" },
      ],
    },
  },
};

export default item;
