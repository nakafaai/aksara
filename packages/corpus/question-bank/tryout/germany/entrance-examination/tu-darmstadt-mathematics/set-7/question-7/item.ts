import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$28\\,\\frac{\\text{km}}{\\text{h}}$$",
        },
        {
          correct: false,
          label: "$$28{,}8\\,\\frac{\\text{km}}{\\text{h}}$$",
        },
        {
          correct: false,
          label: "$$40\\,\\frac{\\text{km}}{\\text{h}}$$",
        },
        {
          correct: false,
          label: "$$12\\,\\frac{\\text{km}}{\\text{h}}$$",
        },
        {
          correct: true,
          label: "$$30\\,\\frac{\\text{km}}{\\text{h}}$$",
        },
        {
          correct: false,
          label: "Das ist mit keiner Geschwindigkeit möglich.",
        },
      ],
    },
  },
};

export default item;
