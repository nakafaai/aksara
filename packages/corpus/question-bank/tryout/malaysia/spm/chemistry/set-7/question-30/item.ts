import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.16\\text{ kg}$$, $$8.77\\text{ m}^3$$" },
        { correct: false, label: "$$2.10\\text{ kg}$$, $$1.78\\text{ m}^3$$" },
        { correct: false, label: "$$2.10\\text{ kg}$$, $$0.374\\text{ m}^3$$" },
        { correct: true, label: "$$2.10\\text{ kg}$$, $$8.48\\text{ m}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.16\\text{ kg}$$, $$8.77\\text{ m}^3$$" },
        { correct: false, label: "$$2.10\\text{ kg}$$, $$1.78\\text{ m}^3$$" },
        { correct: false, label: "$$2.10\\text{ kg}$$, $$0.374\\text{ m}^3$$" },
        { correct: true, label: "$$2.10\\text{ kg}$$, $$8.48\\text{ m}^3$$" },
      ],
    },
  },
};

export default item;
