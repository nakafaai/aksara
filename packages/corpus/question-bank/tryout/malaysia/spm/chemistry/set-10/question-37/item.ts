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
          label: "$$100$$, $$1.80\\text{ kg}$$, $$14.6\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$14.6\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$29.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$155$$, $$3.60\\text{ kg}$$, $$14.6\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$100$$, $$1.80\\text{ kg}$$, $$14.6\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$14.6\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$100$$, $$3.60\\text{ kg}$$, $$29.2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$155$$, $$3.60\\text{ kg}$$, $$14.6\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
