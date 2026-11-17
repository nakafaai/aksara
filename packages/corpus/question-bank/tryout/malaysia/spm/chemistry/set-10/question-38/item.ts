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
          correct: true,
          label: "$$0.100\\text{ mol}$$, $$3.01\\times10^{21}$$, $$10.0\\%$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$6.02\\times10^{21}$$, $$20.0\\%$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$3.01\\times10^{21}$$, $$5.00\\%$$",
        },
        {
          correct: false,
          label: "$$0.0500\\text{ mol}$$, $$3.01\\times10^{21}$$, $$20.0\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.100\\text{ mol}$$, $$3.01\\times10^{21}$$, $$10.0\\%$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$6.02\\times10^{21}$$, $$20.0\\%$$",
        },
        {
          correct: false,
          label: "$$0.100\\text{ mol}$$, $$3.01\\times10^{21}$$, $$5.00\\%$$",
        },
        {
          correct: false,
          label: "$$0.0500\\text{ mol}$$, $$3.01\\times10^{21}$$, $$20.0\\%$$",
        },
      ],
    },
  },
};

export default item;
