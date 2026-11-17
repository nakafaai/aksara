import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$15\\text{ N}$$, and $$1.0\\text{ s}$$" },
        { correct: false, label: "$$6.0\\text{ N}$$, and $$1.0\\text{ s}$$" },
        { correct: false, label: "$$15\\text{ N}$$, and $$0.71\\text{ s}$$" },
        { correct: false, label: "$$15\\text{ N}$$, and it never slides off" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$15\\text{ N}$$, dan $$1.0\\text{ s}$$" },
        { correct: false, label: "$$6.0\\text{ N}$$, dan $$1.0\\text{ s}$$" },
        { correct: false, label: "$$15\\text{ N}$$, dan $$0.71\\text{ s}$$" },
        {
          correct: false,
          label: "$$15\\text{ N}$$, dan ia tidak pernah tergelincir jatuh",
        },
      ],
    },
  },
};

export default item;
