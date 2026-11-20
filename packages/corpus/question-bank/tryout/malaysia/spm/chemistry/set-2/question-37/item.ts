import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.49\\%$$, $$10.0\\%$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label: "$$4.71\\%$$, $$10.0\\%$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label: "$$4.49\\%$$, $$5.00\\%$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label: "$$4.49\\%$$, $$10.0\\%$$, $$1.20\\times10^{22}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.49\\%$$, $$10.0\\%$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label: "$$4.71\\%$$, $$10.0\\%$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label: "$$4.49\\%$$, $$5.00\\%$$, $$6.02\\times10^{21}$$",
        },
        {
          correct: false,
          label: "$$4.49\\%$$, $$10.0\\%$$, $$1.20\\times10^{22}$$",
        },
      ],
    },
  },
};

export default item;
