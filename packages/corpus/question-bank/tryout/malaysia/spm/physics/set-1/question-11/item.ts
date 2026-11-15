import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$200\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$1410\\text{ kPa}$$",
        },
        {
          correct: true,
          label: "$$400\\text{ kPa}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$200\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$1410\\text{ kPa}$$",
        },
        {
          correct: true,
          label: "$$400\\text{ kPa}$$",
        },
      ],
    },
  },
};

export default item;
