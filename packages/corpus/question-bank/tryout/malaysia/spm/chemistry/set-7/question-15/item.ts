import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.200\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.160\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.240\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0800\\text{ mol dm}^{-3}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.200\\text{ mol dm}^{-3}$$" },
        { correct: true, label: "$$0.160\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.240\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0800\\text{ mol dm}^{-3}$$" },
      ],
    },
  },
};

export default item;
