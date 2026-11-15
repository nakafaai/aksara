import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.5\\text{ hours}$$",
        },
        {
          correct: true,
          label: "$$2.8\\text{ hours}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ hours}$$",
        },
        {
          correct: false,
          label: "$$5.7\\text{ hours}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.5\\text{ jam}$$",
        },
        {
          correct: true,
          label: "$$2.8\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$5.7\\text{ jam}$$",
        },
      ],
    },
  },
};

export default item;
