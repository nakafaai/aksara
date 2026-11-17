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
          label: "$$1.46\\text{ kg}$$, $$0.360\\text{ kg}$$, $$86.3\\%$$",
        },
        {
          correct: false,
          label: "$$1.46\\text{ kg}$$, $$0.180\\text{ kg}$$, $$92.6\\%$$",
        },
        {
          correct: false,
          label: "$$2.92\\text{ kg}$$, $$0.360\\text{ kg}$$, $$55.4\\%$$",
        },
        {
          correct: false,
          label: "$$1.46\\text{ kg}$$, $$0\\text{ kg}$$, $$100\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.46\\text{ kg}$$, $$0.360\\text{ kg}$$, $$86.3\\%$$",
        },
        {
          correct: false,
          label: "$$1.46\\text{ kg}$$, $$0.180\\text{ kg}$$, $$92.6\\%$$",
        },
        {
          correct: false,
          label: "$$2.92\\text{ kg}$$, $$0.360\\text{ kg}$$, $$55.4\\%$$",
        },
        {
          correct: false,
          label: "$$1.46\\text{ kg}$$, $$0\\text{ kg}$$, $$100\\%$$",
        },
      ],
    },
  },
};

export default item;
