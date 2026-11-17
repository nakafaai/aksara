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
          label: "$$80\\%$$, $$6.98\\times10^{23}$$, $$0.400\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$20\\%$$, $$6.02\\times10^{23}$$, $$0.400\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$20\\%$$, $$6.98\\times10^{23}$$, $$0.432\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$20\\%$$, $$6.98\\times10^{23}$$, $$0.400\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80\\%$$, $$6.98\\times10^{23}$$, $$0.400\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$20\\%$$, $$6.02\\times10^{23}$$, $$0.400\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$20\\%$$, $$6.98\\times10^{23}$$, $$0.432\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$20\\%$$, $$6.98\\times10^{23}$$, $$0.400\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
