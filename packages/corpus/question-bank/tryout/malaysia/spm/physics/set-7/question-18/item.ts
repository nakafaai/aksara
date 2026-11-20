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
        { correct: false, label: "$$31°$$, $$16\\text{ cm}$$ and $$62°$$" },
        { correct: false, label: "$$31°$$, $$9.5\\text{ cm}$$ and $$62°$$" },
        { correct: true, label: "$$31°$$, $$11\\text{ cm}$$ and $$62°$$" },
        { correct: false, label: "$$31°$$, $$11\\text{ cm}$$ and $$42°$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$31°$$, $$16\\text{ cm}$$ dan $$62°$$" },
        { correct: false, label: "$$31°$$, $$9.5\\text{ cm}$$ dan $$62°$$" },
        { correct: true, label: "$$31°$$, $$11\\text{ cm}$$ dan $$62°$$" },
        { correct: false, label: "$$31°$$, $$11\\text{ cm}$$ dan $$42°$$" },
      ],
    },
  },
};

export default item;
