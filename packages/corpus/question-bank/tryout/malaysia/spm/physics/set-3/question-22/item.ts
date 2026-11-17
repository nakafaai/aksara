import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16\\text{ m}$$, and $$3.6\\text{ s}$$" },
        { correct: false, label: "$$4.0\\text{ m}$$, and $$1.8\\text{ s}$$" },
        { correct: true, label: "$$12\\text{ m}$$, and $$3.1\\text{ s}$$" },
        { correct: false, label: "$$12\\text{ m}$$, and $$1.6\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16\\text{ m}$$, dan $$3.6\\text{ s}$$" },
        { correct: false, label: "$$4.0\\text{ m}$$, dan $$1.8\\text{ s}$$" },
        { correct: true, label: "$$12\\text{ m}$$, dan $$3.1\\text{ s}$$" },
        { correct: false, label: "$$12\\text{ m}$$, dan $$1.6\\text{ s}$$" },
      ],
    },
  },
};

export default item;
