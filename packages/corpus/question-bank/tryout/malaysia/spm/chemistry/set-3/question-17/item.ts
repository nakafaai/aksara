import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.00\\text{ mol dm}^{-3}$$, and a yield of $$88.9\\%$$",
        },
        {
          correct: false,
          label: "$$1.56\\text{ mol dm}^{-3}$$, and a yield of $$56.9\\%$$",
        },
        {
          correct: false,
          label: "$$1.00\\text{ mol dm}^{-3}$$, and a yield of $$100\\%$$",
        },
        {
          correct: false,
          label: "$$1.25\\text{ mol dm}^{-3}$$, and a yield of $$71.1\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.00\\text{ mol dm}^{-3}$$, dan hasil $$88.9\\%$$",
        },
        {
          correct: false,
          label: "$$1.56\\text{ mol dm}^{-3}$$, dan hasil $$56.9\\%$$",
        },
        {
          correct: false,
          label: "$$1.00\\text{ mol dm}^{-3}$$, dan hasil $$100\\%$$",
        },
        {
          correct: false,
          label: "$$1.25\\text{ mol dm}^{-3}$$, dan hasil $$71.1\\%$$",
        },
      ],
    },
  },
};

export default item;
