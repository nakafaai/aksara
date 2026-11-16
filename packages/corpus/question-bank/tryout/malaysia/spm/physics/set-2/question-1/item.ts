import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.95\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.98\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.95\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$1.98\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.95\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.98\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.95\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$1.98\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
