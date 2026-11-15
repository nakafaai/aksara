import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$150\\text{ cm}^3$$, orange to green",
        },
        {
          correct: false,
          label: "$$25.0\\text{ cm}^3$$, green to orange",
        },
        {
          correct: false,
          label: "$$50.0\\text{ cm}^3$$, orange to green",
        },
        {
          correct: true,
          label: "$$25.0\\text{ cm}^3$$, orange to green",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$150\\text{ cm}^3$$, jingga kepada hijau",
        },
        {
          correct: false,
          label: "$$25.0\\text{ cm}^3$$, hijau kepada jingga",
        },
        {
          correct: false,
          label: "$$50.0\\text{ cm}^3$$, jingga kepada hijau",
        },
        {
          correct: true,
          label: "$$25.0\\text{ cm}^3$$, jingga kepada hijau",
        },
      ],
    },
  },
};

export default item;
