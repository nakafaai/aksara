import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$32.0\\text{ kg}$$, the products have more energy",
        },
        {
          correct: false,
          label: "$$53.3\\text{ kg}$$, the products have less energy",
        },
        {
          correct: false,
          label: "$$80.0\\text{ kg}$$, the products have more energy",
        },
        {
          correct: true,
          label: "$$53.3\\text{ kg}$$, the products have more energy",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$32.0\\text{ kg}$$, hasil mempunyai tenaga lebih tinggi",
        },
        {
          correct: false,
          label: "$$53.3\\text{ kg}$$, hasil mempunyai tenaga lebih rendah",
        },
        {
          correct: false,
          label: "$$80.0\\text{ kg}$$, hasil mempunyai tenaga lebih tinggi",
        },
        {
          correct: true,
          label: "$$53.3\\text{ kg}$$, hasil mempunyai tenaga lebih tinggi",
        },
      ],
    },
  },
};

export default item;
