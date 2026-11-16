import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$180\\text{ cm}^3$$, higher at the start" },
        { correct: false, label: "$$240\\text{ cm}^3$$, higher at the start" },
        { correct: false, label: "$$180\\text{ cm}^3$$, lower at the start" },
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, the same at the start",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$180\\text{ cm}^3$$, lebih tinggi pada awal",
        },
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, lebih tinggi pada awal",
        },
        {
          correct: false,
          label: "$$180\\text{ cm}^3$$, lebih rendah pada awal",
        },
        { correct: false, label: "$$240\\text{ cm}^3$$, sama pada awal" },
      ],
    },
  },
};

export default item;
