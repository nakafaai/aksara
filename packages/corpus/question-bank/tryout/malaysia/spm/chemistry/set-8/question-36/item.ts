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
        { correct: true, label: "$$409\\text{ km}$$" },
        { correct: false, label: "$$817\\text{ km}$$" },
        { correct: false, label: "$$204\\text{ km}$$" },
        { correct: false, label: "$$817\\,000\\text{ km}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$409\\text{ km}$$" },
        { correct: false, label: "$$817\\text{ km}$$" },
        { correct: false, label: "$$204\\text{ km}$$" },
        { correct: false, label: "$$817\\,000\\text{ km}$$" },
      ],
    },
  },
};

export default item;
