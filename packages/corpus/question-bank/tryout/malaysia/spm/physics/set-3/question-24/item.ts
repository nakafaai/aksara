import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50\\text{ m}$$, and $$2.28\\text{ L}$$" },
        { correct: false, label: "$$680\\text{ m}$$, and $$1.93\\text{ L}$$" },
        { correct: false, label: "$$680\\text{ m}$$, and $$3.38\\text{ L}$$" },
        { correct: true, label: "$$680\\text{ m}$$, and $$2.28\\text{ L}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50\\text{ m}$$, and $$2.28\\text{ L}$$" },
        { correct: false, label: "$$680\\text{ m}$$, and $$1.93\\text{ L}$$" },
        { correct: false, label: "$$680\\text{ m}$$, and $$3.38\\text{ L}$$" },
        { correct: true, label: "$$680\\text{ m}$$, and $$2.28\\text{ L}$$" },
      ],
    },
  },
};

export default item;
