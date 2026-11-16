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
          label: "$$1.96\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.64\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.54\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$2.45\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.96\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.64\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.54\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$2.45\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
