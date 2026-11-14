import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jalur I lebih panjang $$22\\text{ m}$$ daripada jalur II.",
        },
        {
          correct: false,
          label: "Jalur II lebih panjang $$22\\text{ m}$$ daripada jalur I.",
        },
        {
          correct: false,
          label: "Kedua jalur sama panjang, yaitu $$88\\text{ m}$$.",
        },
        {
          correct: false,
          label: "Panjang jalur II setengah panjang jalur I.",
        },
        {
          correct: true,
          label: "Kedua jalur sama panjang, yaitu $$44\\text{ m}$$.",
        },
      ],
    },
  },
};

export default item;
