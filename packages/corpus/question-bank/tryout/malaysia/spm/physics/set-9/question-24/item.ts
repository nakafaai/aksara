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
        { correct: false, label: "$$0.51\\text{ m}$$, and $$400\\text{ N}$$" },
        { correct: true, label: "$$0.50\\text{ m}$$, and $$400\\text{ N}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, and $$8.4\\text{ kN}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, and $$0.40\\text{ N}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.51\\text{ m}$$, dan $$400\\text{ N}$$" },
        { correct: true, label: "$$0.50\\text{ m}$$, dan $$400\\text{ N}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, dan $$8.4\\text{ kN}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, dan $$0.40\\text{ N}$$" },
      ],
    },
  },
};

export default item;
