import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.103\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.206\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.0515\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0258\\text{ mol dm}^{-3}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.103\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.206\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.0515\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0258\\text{ mol dm}^{-3}$$" },
      ],
    },
  },
};

export default item;
