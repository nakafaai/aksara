import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$c=\\frac{2A}{h}+a$$",
        },
        {
          correct: false,
          label: "$$c=\\frac{A}{2h}-a$$",
        },
        {
          correct: false,
          label: "$$c=\\frac{2A-a}{h}$$",
        },
        {
          correct: false,
          label: "$$c=2Ah-a$$",
        },
        {
          correct: false,
          label: "$$c=\\frac{h}{2A}-a$$",
        },
        {
          correct: true,
          label: "$$c=\\frac{2A}{h}-a$$",
        },
      ],
    },
  },
};

export default item;
