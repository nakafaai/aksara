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
        { correct: true, label: "$$1.35\\%$$" },
        { correct: false, label: "$$2.87\\%$$" },
        { correct: false, label: "$$13.5\\%$$" },
        { correct: false, label: "$$0.135\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.35\\%$$" },
        { correct: false, label: "$$2.87\\%$$" },
        { correct: false, label: "$$13.5\\%$$" },
        { correct: false, label: "$$0.135\\%$$" },
      ],
    },
  },
};

export default item;
