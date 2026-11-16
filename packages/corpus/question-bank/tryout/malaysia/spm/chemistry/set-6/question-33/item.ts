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
        { correct: false, label: "$$9.20\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$4.60\\text{ kJ}$$, $$138\\text{ kJ}$$" },
        { correct: true, label: "$$4.60\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$4.60\\text{ kJ}$$, $$230\\text{ kJ}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$9.20\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$4.60\\text{ kJ}$$, $$138\\text{ kJ}$$" },
        { correct: true, label: "$$4.60\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$4.60\\text{ kJ}$$, $$230\\text{ kJ}$$" },
      ],
    },
  },
};

export default item;
