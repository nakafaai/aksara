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
        { correct: false, label: "$$25\\%$$" },
        { correct: true, label: "$$50\\%$$" },
        { correct: false, label: "$$100\\%$$" },
        { correct: false, label: "$$75\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$25\\%$$" },
        { correct: true, label: "$$50\\%$$" },
        { correct: false, label: "$$100\\%$$" },
        { correct: false, label: "$$75\\%$$" },
      ],
    },
  },
};

export default item;
