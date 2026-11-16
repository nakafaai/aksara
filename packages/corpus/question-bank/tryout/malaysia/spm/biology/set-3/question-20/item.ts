import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "immunity-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$80\\%$$" },
        { correct: false, label: "$$72\\%$$" },
        { correct: true, label: "$$89\\%$$" },
        { correct: false, label: "$$20\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$80\\%$$" },
        { correct: false, label: "$$72\\%$$" },
        { correct: true, label: "$$89\\%$$" },
        { correct: false, label: "$$20\\%$$" },
      ],
    },
  },
};

export default item;
