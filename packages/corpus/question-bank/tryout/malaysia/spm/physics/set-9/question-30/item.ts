import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.94\\text{ A}$$, and $$3.8\\text{ A}$$" },
        { correct: false, label: "$$6.6\\text{ mA}$$, and $$26\\text{ mA}$$" },
        { correct: false, label: "$$0.93\\text{ A}$$, and $$0.74\\text{ A}$$" },
        { correct: true, label: "$$0.93\\text{ A}$$, and $$3.6\\text{ A}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.94\\text{ A}$$, dan $$3.8\\text{ A}$$" },
        { correct: false, label: "$$6.6\\text{ mA}$$, dan $$26\\text{ mA}$$" },
        { correct: false, label: "$$0.93\\text{ A}$$, dan $$0.74\\text{ A}$$" },
        { correct: true, label: "$$0.93\\text{ A}$$, dan $$3.6\\text{ A}$$" },
      ],
    },
  },
};

export default item;
