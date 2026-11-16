import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.5\\times10^{7}$$",
        },
        {
          correct: false,
          label: "$$1.7\\times10^{7}$$",
        },
        {
          correct: true,
          label: "$$1.8\\times10^{7}$$",
        },
        {
          correct: false,
          label: "$$2.6\\times10^{7}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.5\\times10^{7}$$",
        },
        {
          correct: false,
          label: "$$1.7\\times10^{7}$$",
        },
        {
          correct: true,
          label: "$$1.8\\times10^{7}$$",
        },
        {
          correct: false,
          label: "$$2.6\\times10^{7}$$",
        },
      ],
    },
  },
};

export default item;
