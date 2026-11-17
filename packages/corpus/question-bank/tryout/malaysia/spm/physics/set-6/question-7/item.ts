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
        {
          correct: false,
          label: "$$240\\text{ m s}^{-2}$$, and $$2.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$250\\text{ m s}^{-2}$$, and $$10\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$240\\text{ m s}^{-2}$$, and $$10\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ m s}^{-2}$$, and still $$50\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$240\\text{ m s}^{-2}$$, dan $$2.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$250\\text{ m s}^{-2}$$, dan $$10\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$240\\text{ m s}^{-2}$$, dan $$10\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ m s}^{-2}$$, dan masih $$50\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
