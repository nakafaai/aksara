import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.125\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.080\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.250\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0625\\text{ mol dm}^{-3}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.125\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.080\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.250\\text{ mol dm}^{-3}$$" },
        { correct: false, label: "$$0.0625\\text{ mol dm}^{-3}$$" },
      ],
    },
  },
};

export default item;
