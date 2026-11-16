import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$570\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: true,
          label: "$$670\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label: "$$480\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label: "$$1340\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$570\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: true,
          label: "$$670\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label: "$$480\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label: "$$1340\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
