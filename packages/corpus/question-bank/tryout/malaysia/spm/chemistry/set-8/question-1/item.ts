import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x=6$$, $$2.54\\text{ g}$$" },
        { correct: true, label: "$$x=7$$, $$2.33\\text{ g}$$" },
        { correct: false, label: "$$x=7$$, $$2.08\\text{ g}$$" },
        { correct: false, label: "$$x=14$$, $$2.33\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x=6$$, $$2.54\\text{ g}$$" },
        { correct: true, label: "$$x=7$$, $$2.33\\text{ g}$$" },
        { correct: false, label: "$$x=7$$, $$2.08\\text{ g}$$" },
        { correct: false, label: "$$x=14$$, $$2.33\\text{ g}$$" },
      ],
    },
  },
};

export default item;
