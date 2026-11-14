import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$136$$ cm",
        },
        {
          correct: false,
          label: "$$(80+21\\pi)$$ cm",
        },
        {
          correct: false,
          label: "$$\\left(80+\\frac{49}{2}\\pi\\right)$$ cm",
        },
        {
          correct: true,
          label: "$$(80+28\\pi)$$ cm",
        },
        {
          correct: false,
          label: "$$(136+28\\pi)$$ cm",
        },
      ],
    },
  },
};

export default item;
