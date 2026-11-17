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
          label: "$$25.0\\%$$, $$6.77\\times10^{22}$$, $$13.5\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$3.01\\times10^{22}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$2.26\\times10^{22}$$, $$9.53\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$2.26\\times10^{22}$$, $$13.5\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25.0\\%$$, $$6.77\\times10^{22}$$, $$13.5\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$3.01\\times10^{22}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$2.26\\times10^{22}$$, $$9.53\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$2.26\\times10^{22}$$, $$13.5\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
