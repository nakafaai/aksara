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
        { correct: false, label: "$$0.94\\text{ A}$$, and $$750\\text{ V}$$" },
        { correct: false, label: "$$6.6\\text{ mA}$$, and $$5.3\\text{ V}$$" },
        { correct: false, label: "$$4.3\\text{ mA}$$, and $$3.4\\text{ V}$$" },
        { correct: true, label: "$$0.93\\text{ A}$$, and $$742\\text{ V}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.94\\text{ A}$$, dan $$750\\text{ V}$$" },
        { correct: false, label: "$$6.6\\text{ mA}$$, dan $$5.3\\text{ V}$$" },
        { correct: false, label: "$$4.3\\text{ mA}$$, dan $$3.4\\text{ V}$$" },
        { correct: true, label: "$$0.93\\text{ A}$$, dan $$742\\text{ V}$$" },
      ],
    },
  },
};

export default item;
