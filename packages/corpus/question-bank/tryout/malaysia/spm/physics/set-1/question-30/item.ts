import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.50\\text{ kWh}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ kWh}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ kWh}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ kWh}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.50\\text{ kWj}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ kWj}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ kWj}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ kWj}$$",
        },
      ],
    },
  },
};

export default item;
