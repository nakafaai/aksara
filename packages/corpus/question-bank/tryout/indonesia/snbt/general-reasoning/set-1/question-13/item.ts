import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0{,}11 \\times \\frac{35}{9}$$",
        },
        {
          correct: false,
          label: "$$0{,}22 \\times \\frac{17}{9}$$",
        },
        {
          correct: false,
          label: "$$0{,}33 \\times \\frac{34}{27}$$",
        },
        {
          correct: false,
          label: "$$0{,}55 \\times \\frac{34}{45}$$",
        },
        {
          correct: false,
          label: "$$0{,}66 \\times \\frac{17}{27}$$",
        },
      ],
    },
  },
};

export default item;
