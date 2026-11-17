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
        { correct: true, label: "$$2.0\\text{ kN}$$, and $$3.9\\text{ cm}$$" },
        {
          correct: false,
          label: "$$98\\text{ N}$$, and the wire never breaks",
        },
        { correct: false, label: "$$2.0\\text{ kN}$$, and $$25\\text{ cm}$$" },
        { correct: false, label: "$$3.9\\text{ kN}$$, and $$7.8\\text{ cm}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$2.0\\text{ kN}$$, dan $$3.9\\text{ cm}$$" },
        {
          correct: false,
          label: "$$98\\text{ N}$$, dan dawai tidak pernah putus",
        },
        { correct: false, label: "$$2.0\\text{ kN}$$, dan $$25\\text{ cm}$$" },
        { correct: false, label: "$$3.9\\text{ kN}$$, dan $$7.8\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
