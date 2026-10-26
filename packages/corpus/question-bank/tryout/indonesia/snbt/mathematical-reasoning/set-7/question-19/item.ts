import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$100(\\sqrt{3} - 1) \\, \\text{m/s}$$",
        },
        {
          correct: false,
          label: "$$150\\sqrt{3} \\, \\text{m/s}$$",
        },
        {
          correct: false,
          label: "$$300\\sqrt{3} \\, \\text{m/s}$$",
        },
        {
          correct: false,
          label: "$$450\\sqrt{3} \\, \\text{m/s}$$",
        },
        {
          correct: false,
          label: "$$250\\sqrt{3} \\, \\text{m/s}$$",
        },
      ],
    },
  },
};

export default item;
