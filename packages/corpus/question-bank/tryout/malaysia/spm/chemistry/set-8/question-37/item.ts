import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$36.8\\text{ kg}$$" },
        { correct: false, label: "$$28.0\\text{ kg}$$" },
        { correct: true, label: "$$22.4\\text{ kg}$$" },
        { correct: false, label: "$$17.9\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$36.8\\text{ kg}$$" },
        { correct: false, label: "$$28.0\\text{ kg}$$" },
        { correct: true, label: "$$22.4\\text{ kg}$$" },
        { correct: false, label: "$$17.9\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
