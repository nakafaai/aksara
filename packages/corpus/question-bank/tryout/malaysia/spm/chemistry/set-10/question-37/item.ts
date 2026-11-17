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
          label: "$$100$$, $$1.80\\text{ kg}$$, $$16.2\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$16.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$13.1\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$155$$, $$3.60\\text{ kg}$$, $$16.2\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$100$$, $$1.80\\text{ kg}$$, $$16.2\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$16.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$13.1\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$155$$, $$3.60\\text{ kg}$$, $$16.2\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
