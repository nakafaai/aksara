import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$750\\text{ kg}$$, rises $$20\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$7500\\text{ kg}$$, rises $$0.40\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$750\\text{ kg}$$, rises $$0.40\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$0.30\\text{ kg}$$, rises $$1000\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$750\\text{ kg}$$, naik $$20\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$7500\\text{ kg}$$, naik $$0.40\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$750\\text{ kg}$$, naik $$0.40\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$0.30\\text{ kg}$$, naik $$1000\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
