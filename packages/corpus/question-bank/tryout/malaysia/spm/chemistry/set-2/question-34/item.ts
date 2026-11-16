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
          label:
            "$$-28.6\\text{ kJ mol}^{-1}$$, with the reactants above the products",
        },
        {
          correct: true,
          label:
            "$$+28.6\\text{ kJ mol}^{-1}$$, with the products above the reactants",
        },
        {
          correct: false,
          label:
            "$$+0.714\\text{ kJ mol}^{-1}$$, with the products above the reactants",
        },
        {
          correct: false,
          label:
            "$$+28.6\\text{ kJ mol}^{-1}$$, with the reactants above the products",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-28.6\\text{ kJ mol}^{-1}$$, dengan bahan tindak balas di atas hasil tindak balas",
        },
        {
          correct: true,
          label:
            "$$+28.6\\text{ kJ mol}^{-1}$$, dengan hasil tindak balas di atas bahan tindak balas",
        },
        {
          correct: false,
          label:
            "$$+0.714\\text{ kJ mol}^{-1}$$, dengan hasil tindak balas di atas bahan tindak balas",
        },
        {
          correct: false,
          label:
            "$$+28.6\\text{ kJ mol}^{-1}$$, dengan bahan tindak balas di atas hasil tindak balas",
        },
      ],
    },
  },
};

export default item;
