import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6.02\\times10^{23}$$, $$1.20\\times10^{23}$$, $$0$$",
        },
        {
          correct: false,
          label: "$$1.13\\times10^{23}$$, $$6.42\\times10^{23}$$, $$0$$",
        },
        {
          correct: false,
          label: "$$1.20\\times10^{24}$$, $$2.41\\times10^{23}$$, $$0$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{23}$$, $$1.20\\times10^{23}$$, $$1.20\\times10^{23}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6.02\\times10^{23}$$, $$1.20\\times10^{23}$$, $$0$$",
        },
        {
          correct: false,
          label: "$$1.13\\times10^{23}$$, $$6.42\\times10^{23}$$, $$0$$",
        },
        {
          correct: false,
          label: "$$1.20\\times10^{24}$$, $$2.41\\times10^{23}$$, $$0$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{23}$$, $$1.20\\times10^{23}$$, $$1.20\\times10^{23}$$",
        },
      ],
    },
  },
};

export default item;
