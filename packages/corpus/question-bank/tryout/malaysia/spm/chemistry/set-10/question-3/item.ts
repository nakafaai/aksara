import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10.5$$, $$8.73\\times10^{24}$$, $$90.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.8$$, $$7.53\\times10^{24}$$, $$90.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.8$$, $$8.73\\times10^{24}$$, $$60.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$10.8$$, $$8.73\\times10^{24}$$, $$90.0\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10.5$$, $$8.73\\times10^{24}$$, $$90.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.8$$, $$7.53\\times10^{24}$$, $$90.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.8$$, $$8.73\\times10^{24}$$, $$60.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$10.8$$, $$8.73\\times10^{24}$$, $$90.0\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
