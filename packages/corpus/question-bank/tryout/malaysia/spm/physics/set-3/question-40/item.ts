import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.6\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$0.026\\text{ mA}$$",
        },
        {
          correct: true,
          label: "$$0.26\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$0.16\\text{ mA}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.6\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$0.026\\text{ mA}$$",
        },
        {
          correct: true,
          label: "$$0.26\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$0.16\\text{ mA}$$",
        },
      ],
    },
  },
};

export default item;
