import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$14.3\\text{ kg}$$" },
        { correct: false, label: "$$24.4\\text{ kg}$$" },
        { correct: false, label: "$$16.8\\text{ kg}$$" },
        { correct: true, label: "$$12.2\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$14.3\\text{ kg}$$" },
        { correct: false, label: "$$24.4\\text{ kg}$$" },
        { correct: false, label: "$$16.8\\text{ kg}$$" },
        { correct: true, label: "$$12.2\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
