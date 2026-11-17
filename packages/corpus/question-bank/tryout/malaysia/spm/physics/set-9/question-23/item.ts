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
        { correct: true, label: "$$2.0\\text{ kN}$$, and $$1.5\\text{ kN}$$" },
        { correct: false, label: "$$98\\text{ N}$$, and $$98\\text{ N}$$" },
        { correct: false, label: "$$2.0\\text{ kN}$$, and $$2.0\\text{ kN}$$" },
        { correct: false, label: "$$3.9\\text{ kN}$$, and $$2.9\\text{ kN}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$2.0\\text{ kN}$$, dan $$1.5\\text{ kN}$$" },
        { correct: false, label: "$$98\\text{ N}$$, dan $$98\\text{ N}$$" },
        { correct: false, label: "$$2.0\\text{ kN}$$, dan $$2.0\\text{ kN}$$" },
        { correct: false, label: "$$3.9\\text{ kN}$$, dan $$2.9\\text{ kN}$$" },
      ],
    },
  },
};

export default item;
