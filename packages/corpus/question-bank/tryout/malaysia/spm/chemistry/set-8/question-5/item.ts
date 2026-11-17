import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.0890\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.0267\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0375\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.00890\\text{ mol dm}^{-3}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.0890\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.0267\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0375\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.00890\\text{ mol dm}^{-3}$$" },
      ],
    },
  },
};

export default item;
