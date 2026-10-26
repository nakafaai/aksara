import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\{x \\mid x < 5, x \\in \\mathbb{R}\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x \\mid x > \\frac{5}{4}, x \\in \\mathbb{R}\\}$$",
        },
        {
          correct: true,
          label: "$$\\{x \\mid \\frac{5}{4} < x < 5, x \\in \\mathbb{R}\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x \\mid x < 15, x \\in \\mathbb{R}\\}$$",
        },
        {
          correct: false,
          label: "$$\\{x \\mid 5 < x < 15, x \\in \\mathbb{R}\\}$$",
        },
      ],
    },
  },
};

export default item;
