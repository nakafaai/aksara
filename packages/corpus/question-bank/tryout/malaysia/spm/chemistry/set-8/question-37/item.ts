import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$36.8\\text{ kg}$$, $$7.91\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$28.0\\text{ kg}$$, $$6.02\\times10^{23}$$",
        },
        { correct: true, label: "$$22.4\\text{ kg}$$, $$4.82\\times10^{23}$$" },
        {
          correct: false,
          label: "$$22.4\\text{ kg}$$, $$4.82\\times10^{20}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$36.8\\text{ kg}$$, $$7.91\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$28.0\\text{ kg}$$, $$6.02\\times10^{23}$$",
        },
        { correct: true, label: "$$22.4\\text{ kg}$$, $$4.82\\times10^{23}$$" },
        {
          correct: false,
          label: "$$22.4\\text{ kg}$$, $$4.82\\times10^{20}$$",
        },
      ],
    },
  },
};

export default item;
