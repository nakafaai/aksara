import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2420\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$1810\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$1510\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$1260\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2420\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$1810\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$1510\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$1260\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
