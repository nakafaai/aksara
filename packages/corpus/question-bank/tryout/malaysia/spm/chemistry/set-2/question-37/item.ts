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
          label: "$$2.24\\text{ g}$$, $$1000$$, $$4.82\\times10^{19}$$",
        },
        {
          correct: false,
          label: "$$2.24\\text{ g}$$, $$1000$$, $$4.82\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$2.24\\text{ g}$$, $$2000$$, $$4.82\\times10^{19}$$",
        },
        {
          correct: false,
          label: "$$2.80\\text{ g}$$, $$1000$$, $$6.02\\times10^{19}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.24\\text{ g}$$, $$1000$$, $$4.82\\times10^{19}$$",
        },
        {
          correct: false,
          label: "$$2.24\\text{ g}$$, $$1000$$, $$4.82\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$2.24\\text{ g}$$, $$2000$$, $$4.82\\times10^{19}$$",
        },
        {
          correct: false,
          label: "$$2.80\\text{ g}$$, $$1000$$, $$6.02\\times10^{19}$$",
        },
      ],
    },
  },
};

export default item;
