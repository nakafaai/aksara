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
        { correct: true, label: "$$600\\text{ cm}^3$$, lower at the start" },
        {
          correct: false,
          label: "$$1200\\text{ cm}^3$$, the same at the start",
        },
        { correct: false, label: "$$300\\text{ cm}^3$$, lower at the start" },
        { correct: false, label: "$$600\\text{ cm}^3$$, higher at the start" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$600\\text{ cm}^3$$, lebih rendah pada permulaan",
        },
        { correct: false, label: "$$1200\\text{ cm}^3$$, sama pada permulaan" },
        {
          correct: false,
          label: "$$300\\text{ cm}^3$$, lebih rendah pada permulaan",
        },
        {
          correct: false,
          label: "$$600\\text{ cm}^3$$, lebih tinggi pada permulaan",
        },
      ],
    },
  },
};

export default item;
