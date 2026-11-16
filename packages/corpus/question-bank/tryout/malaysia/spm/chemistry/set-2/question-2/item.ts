import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$20\\%$$" },
        { correct: false, label: "$$80\\%$$" },
        { correct: false, label: "$$10.8\\%$$" },
        { correct: false, label: "$$50\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$20\\%$$" },
        { correct: false, label: "$$80\\%$$" },
        { correct: false, label: "$$10.8\\%$$" },
        { correct: false, label: "$$50\\%$$" },
      ],
    },
  },
};

export default item;
