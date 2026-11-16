import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$125\\,000$$" },
        { correct: false, label: "$$62\\,500$$" },
        { correct: false, label: "$$250\\,000$$" },
        { correct: false, label: "$$89\\,000$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$125\\,000$$" },
        { correct: false, label: "$$62\\,500$$" },
        { correct: false, label: "$$250\\,000$$" },
        { correct: false, label: "$$89\\,000$$" },
      ],
    },
  },
};

export default item;
