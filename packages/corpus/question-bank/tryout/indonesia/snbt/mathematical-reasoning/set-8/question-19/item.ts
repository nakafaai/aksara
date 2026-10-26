import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{24}{\\sqrt{61}}$$",
        },
        {
          correct: false,
          label: "$$\\frac{12}{\\sqrt{61}}$$",
        },
        {
          correct: false,
          label: "$$\\frac{18}{\\sqrt{61}}$$",
        },
        {
          correct: false,
          label: "$$\\frac{30}{\\sqrt{61}}$$",
        },
        {
          correct: false,
          label: "$$\\frac{36}{\\sqrt{61}}$$",
        },
      ],
    },
  },
};

export default item;
