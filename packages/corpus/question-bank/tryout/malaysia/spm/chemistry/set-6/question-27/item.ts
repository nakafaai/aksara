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
        { correct: false, label: "$$22.8\\%$$, $$9.6\\text{ dm}^3$$" },
        { correct: true, label: "$$22.8\\%$$, $$76.8\\text{ dm}^3$$" },
        { correct: false, label: "$$45.6\\%$$, $$76.8\\text{ dm}^3$$" },
        { correct: false, label: "$$22.8\\%$$, $$86.4\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$22.8\\%$$, $$9.6\\text{ dm}^3$$" },
        { correct: true, label: "$$22.8\\%$$, $$76.8\\text{ dm}^3$$" },
        { correct: false, label: "$$45.6\\%$$, $$76.8\\text{ dm}^3$$" },
        { correct: false, label: "$$22.8\\%$$, $$86.4\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
