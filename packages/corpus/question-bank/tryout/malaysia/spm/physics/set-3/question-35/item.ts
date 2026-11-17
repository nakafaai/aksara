import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$15.6\\text{ V}$$, and $$7.2\\,\\Omega$$" },
        { correct: false, label: "$$16.3\\text{ V}$$, and $$8.6\\,\\Omega$$" },
        { correct: false, label: "$$17.0\\text{ V}$$, and $$10\\,\\Omega$$" },
        { correct: false, label: "$$14.2\\text{ V}$$, and $$4.4\\,\\Omega$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$15.6\\text{ V}$$, dan $$7.2\\,\\Omega$$" },
        { correct: false, label: "$$16.3\\text{ V}$$, dan $$8.6\\,\\Omega$$" },
        { correct: false, label: "$$17.0\\text{ V}$$, dan $$10\\,\\Omega$$" },
        { correct: false, label: "$$14.2\\text{ V}$$, dan $$4.4\\,\\Omega$$" },
      ],
    },
  },
};

export default item;
