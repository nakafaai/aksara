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
        { correct: false, label: "$$35°$$, $$62°$$ and $$49°$$" },
        { correct: false, label: "$$31°$$, $$42°$$ and $$42°$$" },
        { correct: true, label: "$$31°$$, $$62°$$ and $$42°$$" },
        { correct: false, label: "$$31°$$, $$49°$$ and $$42°$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$35°$$, $$62°$$ dan $$49°$$" },
        { correct: false, label: "$$31°$$, $$42°$$ dan $$42°$$" },
        { correct: true, label: "$$31°$$, $$62°$$ dan $$42°$$" },
        { correct: false, label: "$$31°$$, $$49°$$ dan $$42°$$" },
      ],
    },
  },
};

export default item;
