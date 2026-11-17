import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.5$$, and $$24^\\circ$$" },
        { correct: true, label: "$$1.67$$, and $$37^\\circ$$" },
        { correct: false, label: "$$1.67$$, and $$53^\\circ$$" },
        { correct: false, label: "$$1.67$$, and $$31^\\circ$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.5$$, dan $$24^\\circ$$" },
        { correct: true, label: "$$1.67$$, dan $$37^\\circ$$" },
        { correct: false, label: "$$1.67$$, dan $$53^\\circ$$" },
        { correct: false, label: "$$1.67$$, dan $$31^\\circ$$" },
      ],
    },
  },
};

export default item;
