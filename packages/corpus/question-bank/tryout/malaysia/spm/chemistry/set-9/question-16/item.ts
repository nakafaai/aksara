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
        { correct: false, label: "$$30.0\\%$$, $$36.0\\text{ cm}^3$$" },
        { correct: false, label: "$$60.0\\%$$, $$72.0\\text{ cm}^3$$" },
        { correct: true, label: "$$70.0\\%$$, $$84.0\\text{ cm}^3$$" },
        { correct: false, label: "$$70.0\\%$$, $$168\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$30.0\\%$$, $$36.0\\text{ cm}^3$$" },
        { correct: false, label: "$$60.0\\%$$, $$72.0\\text{ cm}^3$$" },
        { correct: true, label: "$$70.0\\%$$, $$84.0\\text{ cm}^3$$" },
        { correct: false, label: "$$70.0\\%$$, $$168\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
