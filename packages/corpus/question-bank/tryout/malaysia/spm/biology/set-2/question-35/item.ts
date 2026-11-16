import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16$$" },
        { correct: false, label: "$$20$$" },
        { correct: true, label: "$$17$$" },
        { correct: false, label: "$$100\\,000$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16$$" },
        { correct: false, label: "$$20$$" },
        { correct: true, label: "$$17$$" },
        { correct: false, label: "$$100\\,000$$" },
      ],
    },
  },
};

export default item;
