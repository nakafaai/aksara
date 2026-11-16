import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.16\\text{ kg}$$" },
        { correct: false, label: "$$1.95\\text{ kg}$$" },
        { correct: false, label: "$$1.05\\text{ kg}$$" },
        { correct: true, label: "$$2.10\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.16\\text{ kg}$$" },
        { correct: false, label: "$$1.95\\text{ kg}$$" },
        { correct: false, label: "$$1.05\\text{ kg}$$" },
        { correct: true, label: "$$2.10\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
