import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, the same at the start",
        },
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, the same at the start",
        },
        { correct: false, label: "$$480\\text{ cm}^3$$, higher at the start" },
        { correct: true, label: "$$240\\text{ cm}^3$$, higher at the start" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120\\text{ cm}^3$$, sama pada awal" },
        { correct: false, label: "$$240\\text{ cm}^3$$, sama pada awal" },
        {
          correct: false,
          label: "$$480\\text{ cm}^3$$, lebih tinggi pada awal",
        },
        {
          correct: true,
          label: "$$240\\text{ cm}^3$$, lebih tinggi pada awal",
        },
      ],
    },
  },
};

export default item;
