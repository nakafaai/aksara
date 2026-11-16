import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$33.6\\%$$, $$70.9\\text{ cm}^3$$" },
        { correct: true, label: "$$67.2\\%$$, $$70.9\\text{ cm}^3$$" },
        { correct: false, label: "$$67.2\\%$$, $$35.5\\text{ cm}^3$$" },
        { correct: false, label: "$$94.7\\%$$, $$70.9\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$33.6\\%$$, $$70.9\\text{ cm}^3$$" },
        { correct: true, label: "$$67.2\\%$$, $$70.9\\text{ cm}^3$$" },
        { correct: false, label: "$$67.2\\%$$, $$35.5\\text{ cm}^3$$" },
        { correct: false, label: "$$94.7\\%$$, $$70.9\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
