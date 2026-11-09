import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "proportion",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}1{,}2$$ juta",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{,}5$$ juta",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{,}65$$ juta",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{,}8$$ juta",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{,}2$$ juta",
        },
      ],
    },
  },
};

export default item;
