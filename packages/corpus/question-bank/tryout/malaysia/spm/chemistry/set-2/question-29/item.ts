import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$" },
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$4$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$" },
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$4$$" },
      ],
    },
  },
};

export default item;
