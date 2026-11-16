import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "support-and-movement-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$296.25\\text{ N}$$" },
        { correct: false, label: "$$240\\text{ N}$$" },
        { correct: false, label: "$$45\\text{ N}$$" },
        { correct: false, label: "$$1185\\text{ N}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$296.25\\text{ N}$$" },
        { correct: false, label: "$$240\\text{ N}$$" },
        { correct: false, label: "$$45\\text{ N}$$" },
        { correct: false, label: "$$1185\\text{ N}$$" },
      ],
    },
  },
};

export default item;
