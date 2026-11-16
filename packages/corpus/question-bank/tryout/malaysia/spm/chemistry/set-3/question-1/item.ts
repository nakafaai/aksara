import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.101\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.203\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$2.03\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$1.21\\text{ mol dm}^{-3}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.101\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.203\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$2.03\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$1.21\\text{ mol dm}^{-3}$$" },
      ],
    },
  },
};

export default item;
