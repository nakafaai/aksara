import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$80\\text{ cm}$$, and $$81\\text{ cm}$$" },
        { correct: true, label: "$$89\\text{ cm}$$, and $$94\\text{ cm}$$" },
        { correct: false, label: "$$89\\text{ cm}$$, and $$89\\text{ cm}$$" },
        { correct: false, label: "$$45\\text{ cm}$$, and $$47\\text{ cm}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$80\\text{ cm}$$, dan $$81\\text{ cm}$$" },
        { correct: true, label: "$$89\\text{ cm}$$, dan $$94\\text{ cm}$$" },
        { correct: false, label: "$$89\\text{ cm}$$, dan $$89\\text{ cm}$$" },
        { correct: false, label: "$$45\\text{ cm}$$, dan $$47\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
