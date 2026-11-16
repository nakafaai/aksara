import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$+5$$ to $$+2$$, $$0.65\\text{ g}$$" },
        { correct: true, label: "$$+5$$ to $$+2$$, $$0.98\\text{ g}$$" },
        { correct: false, label: "$$+3$$ to $$+2$$, $$0.33\\text{ g}$$" },
        { correct: false, label: "$$+5$$ to $$+2$$, $$1.95\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$+5$$ kepada $$+2$$, $$0.65\\text{ g}$$" },
        { correct: true, label: "$$+5$$ kepada $$+2$$, $$0.98\\text{ g}$$" },
        { correct: false, label: "$$+3$$ kepada $$+2$$, $$0.33\\text{ g}$$" },
        { correct: false, label: "$$+5$$ kepada $$+2$$, $$1.95\\text{ g}$$" },
      ],
    },
  },
};

export default item;
