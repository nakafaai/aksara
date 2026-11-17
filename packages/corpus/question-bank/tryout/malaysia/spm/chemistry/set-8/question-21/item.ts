import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.55\\text{ mol}$$" },
        { correct: false, label: "$$0.60\\text{ mol}$$" },
        { correct: false, label: "$$0.45\\text{ mol}$$" },
        { correct: false, label: "$$1.10\\text{ mol}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.55\\text{ mol}$$" },
        { correct: false, label: "$$0.60\\text{ mol}$$" },
        { correct: false, label: "$$0.45\\text{ mol}$$" },
        { correct: false, label: "$$1.10\\text{ mol}$$" },
      ],
    },
  },
};

export default item;
