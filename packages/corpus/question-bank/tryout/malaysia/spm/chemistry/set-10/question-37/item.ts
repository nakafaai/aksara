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
          label:
            "$$22.6\\text{ kg}$$, $$3.60\\text{ kg}$$, $$6.02\\times10^{23}$$",
        },
        {
          correct: true,
          label:
            "$$18.1\\text{ kg}$$, $$2.88\\text{ kg}$$, $$4.82\\times10^{23}$$",
        },
        {
          correct: false,
          label:
            "$$18.1\\text{ kg}$$, $$1.44\\text{ kg}$$, $$4.82\\times10^{23}$$",
        },
        {
          correct: false,
          label:
            "$$18.1\\text{ kg}$$, $$2.88\\text{ kg}$$, $$4.82\\times10^{25}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$22.6\\text{ kg}$$, $$3.60\\text{ kg}$$, $$6.02\\times10^{23}$$",
        },
        {
          correct: true,
          label:
            "$$18.1\\text{ kg}$$, $$2.88\\text{ kg}$$, $$4.82\\times10^{23}$$",
        },
        {
          correct: false,
          label:
            "$$18.1\\text{ kg}$$, $$1.44\\text{ kg}$$, $$4.82\\times10^{23}$$",
        },
        {
          correct: false,
          label:
            "$$18.1\\text{ kg}$$, $$2.88\\text{ kg}$$, $$4.82\\times10^{25}$$",
        },
      ],
    },
  },
};

export default item;
