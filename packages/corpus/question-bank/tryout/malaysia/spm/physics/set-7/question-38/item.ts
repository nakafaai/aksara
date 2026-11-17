import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "beta and $$6.0\\text{ h}$$" },
        { correct: true, label: "gamma and $$6.0\\text{ h}$$" },
        { correct: false, label: "gamma and $$6.8\\text{ h}$$" },
        { correct: false, label: "gamma and $$2.3\\text{ h}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "beta dan $$6.0\\text{ j}$$" },
        { correct: true, label: "gama dan $$6.0\\text{ j}$$" },
        { correct: false, label: "gama dan $$6.8\\text{ j}$$" },
        { correct: false, label: "gama dan $$2.3\\text{ j}$$" },
      ],
    },
  },
};

export default item;
