import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$100\\text{ cm}^3$$, orange to green" },
        { correct: true, label: "$$66.7\\text{ cm}^3$$, orange to green" },
        { correct: false, label: "$$66.7\\text{ cm}^3$$, green to orange" },
        { correct: false, label: "$$150\\text{ cm}^3$$, orange to green" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$100\\text{ cm}^3$$, jingga kepada hijau" },
        { correct: true, label: "$$66.7\\text{ cm}^3$$, jingga kepada hijau" },
        { correct: false, label: "$$66.7\\text{ cm}^3$$, hijau kepada jingga" },
        { correct: false, label: "$$150\\text{ cm}^3$$, jingga kepada hijau" },
      ],
    },
  },
};

export default item;
