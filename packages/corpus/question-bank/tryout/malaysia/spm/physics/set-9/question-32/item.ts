import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.060\\text{ N}$$, and $$9.8\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.060\\text{ N}$$, and it keeps speeding up",
        },
        {
          correct: false,
          label: "$$0.12\\text{ N}$$, and $$2.5\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$0.060\\text{ N}$$, and $$4.9\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.060\\text{ N}$$, dan $$9.8\\text{ m s}^{-1}$$",
        },
        { correct: false, label: "$$0.060\\text{ N}$$, dan ia terus memecut" },
        {
          correct: false,
          label: "$$0.12\\text{ N}$$, dan $$2.5\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$0.060\\text{ N}$$, dan $$4.9\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
