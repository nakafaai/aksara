import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.202 \\pm 0.006\\text{ s}$$, and $$0.020\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$0.202 \\pm 0.006\\text{ s}$$, and $$0.0006\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.202 \\pm 0.013\\text{ s}$$, and $$0.0013\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.202 \\pm 0.006\\text{ s}$$, and $$0.0003\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.202 \\pm 0.006\\text{ s}$$, dan $$0.020\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$0.202 \\pm 0.006\\text{ s}$$, dan $$0.0006\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.202 \\pm 0.013\\text{ s}$$, dan $$0.0013\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.202 \\pm 0.006\\text{ s}$$, dan $$0.0003\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
