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
          correct: true,
          label: "$$261\\text{ N}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$157\\text{ N}$$, and $$4.4\\text{ m s}^{-1}$$",
        },
        { correct: false, label: "$$457\\text{ N}$$, and it stays at rest" },
        {
          correct: false,
          label: "$$240\\text{ N}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$261\\text{ N}$$, dan $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$157\\text{ N}$$, dan $$4.4\\text{ m s}^{-1}$$",
        },
        { correct: false, label: "$$457\\text{ N}$$, dan ia kekal pegun" },
        {
          correct: false,
          label: "$$240\\text{ N}$$, dan $$3.0\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
