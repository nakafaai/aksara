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
        { correct: true, label: "$$1.1\\text{ m}$$, and $$13\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$, and $$6.6\\text{ m}$$" },
        { correct: false, label: "$$4.6\\text{ m}$$, and $$53\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$, and $$3.3\\text{ m}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.1\\text{ m}$$, dan $$13\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$, dan $$6.6\\text{ m}$$" },
        { correct: false, label: "$$4.6\\text{ m}$$, dan $$53\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$, dan $$3.3\\text{ m}$$" },
      ],
    },
  },
};

export default item;
