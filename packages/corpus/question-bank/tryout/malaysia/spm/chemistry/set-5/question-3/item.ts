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
          correct: true,
          label: "$$4.86\\text{ g}$$, $$50$$, $$6.98\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.66\\text{ g}$$, $$50$$, $$5.78\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.86\\text{ g}$$, $$48$$, $$6.98\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.86\\text{ g}$$, $$50$$, $$3.37\\times10^{23}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.86\\text{ g}$$, $$50$$, $$6.98\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.66\\text{ g}$$, $$50$$, $$5.78\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.86\\text{ g}$$, $$48$$, $$6.98\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.86\\text{ g}$$, $$50$$, $$3.37\\times10^{23}$$",
        },
      ],
    },
  },
};

export default item;
