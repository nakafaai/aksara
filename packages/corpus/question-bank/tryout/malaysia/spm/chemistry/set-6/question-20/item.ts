import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.72\\text{ kg}$$" },
        { correct: true, label: "$$4.44\\text{ kg}$$" },
        { correct: false, label: "$$3.80\\text{ kg}$$" },
        { correct: false, label: "$$4.80\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.72\\text{ kg}$$" },
        { correct: true, label: "$$4.44\\text{ kg}$$" },
        { correct: false, label: "$$3.80\\text{ kg}$$" },
        { correct: false, label: "$$4.80\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
