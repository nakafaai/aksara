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
        {
          correct: false,
          label: "$$3.6\\text{ kN}$$, and $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ kN}$$, and $$18\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.69\\text{ kN}$$, and $$18\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$3.6\\text{ kN}$$, and $$18\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.6\\text{ kN}$$, dan $$17\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ kN}$$, dan $$18\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.69\\text{ kN}$$, dan $$18\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$3.6\\text{ kN}$$, dan $$18\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
