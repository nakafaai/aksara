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
        { correct: false, label: "$$22.8\\%$$, $$76.8\\text{ dm}^3$$" },
        { correct: true, label: "$$22.8\\%$$, $$528\\text{ dm}^3$$" },
        { correct: false, label: "$$45.6\\%$$, $$528\\text{ dm}^3$$" },
        { correct: false, label: "$$22.8\\%$$, $$614\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$22.8\\%$$, $$76.8\\text{ dm}^3$$" },
        { correct: true, label: "$$22.8\\%$$, $$528\\text{ dm}^3$$" },
        { correct: false, label: "$$45.6\\%$$, $$528\\text{ dm}^3$$" },
        { correct: false, label: "$$22.8\\%$$, $$614\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
