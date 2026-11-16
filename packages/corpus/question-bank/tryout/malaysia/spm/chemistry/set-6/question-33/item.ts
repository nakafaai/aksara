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
        { correct: false, label: "$$27.6\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$13.8\\text{ kJ}$$, $$138\\text{ kJ}$$" },
        { correct: true, label: "$$13.8\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$92.0\\text{ kJ}$$, $$322\\text{ kJ}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$27.6\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$13.8\\text{ kJ}$$, $$138\\text{ kJ}$$" },
        { correct: true, label: "$$13.8\\text{ kJ}$$, $$322\\text{ kJ}$$" },
        { correct: false, label: "$$92.0\\text{ kJ}$$, $$322\\text{ kJ}$$" },
      ],
    },
  },
};

export default item;
