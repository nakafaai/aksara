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
        { correct: false, label: "$$35°$$ and $$62°$$" },
        { correct: false, label: "$$31°$$ and $$42°$$" },
        { correct: true, label: "$$31°$$ and $$62°$$" },
        { correct: false, label: "$$31°$$ and $$49°$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$35°$$ dan $$62°$$" },
        { correct: false, label: "$$31°$$ dan $$42°$$" },
        { correct: true, label: "$$31°$$ dan $$62°$$" },
        { correct: false, label: "$$31°$$ dan $$49°$$" },
      ],
    },
  },
};

export default item;
