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
          label: "$$216\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$230\\text{ kPa}$$",
        },
        {
          correct: true,
          label: "$$224\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$422\\text{ kPa}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$216\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$230\\text{ kPa}$$",
        },
        {
          correct: true,
          label: "$$224\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$422\\text{ kPa}$$",
        },
      ],
    },
  },
};

export default item;
