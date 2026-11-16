import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$252\\text{ g}$$, $$72\\text{ dm}^3$$" },
        { correct: true, label: "$$504\\text{ g}$$, $$144\\text{ dm}^3$$" },
        { correct: false, label: "$$504\\text{ g}$$, $$72\\text{ dm}^3$$" },
        { correct: false, label: "$$318\\text{ g}$$, $$72\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$252\\text{ g}$$, $$72\\text{ dm}^3$$" },
        { correct: true, label: "$$504\\text{ g}$$, $$144\\text{ dm}^3$$" },
        { correct: false, label: "$$504\\text{ g}$$, $$72\\text{ dm}^3$$" },
        { correct: false, label: "$$318\\text{ g}$$, $$72\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
