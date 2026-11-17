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
        { correct: false, label: "$$2.0\\,\\Omega$$, and $$5.0\\text{ V}$$" },
        { correct: false, label: "$$1.8\\,\\Omega$$, and $$3.9\\text{ V}$$" },
        { correct: true, label: "$$1.8\\,\\Omega$$, and $$4.9\\text{ V}$$" },
        { correct: false, label: "$$2.5\\,\\Omega$$, and $$4.9\\text{ V}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.0\\,\\Omega$$, dan $$5.0\\text{ V}$$" },
        { correct: false, label: "$$1.8\\,\\Omega$$, dan $$3.9\\text{ V}$$" },
        { correct: true, label: "$$1.8\\,\\Omega$$, dan $$4.9\\text{ V}$$" },
        { correct: false, label: "$$2.5\\,\\Omega$$, dan $$4.9\\text{ V}$$" },
      ],
    },
  },
};

export default item;
