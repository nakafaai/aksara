import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "fraction",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60$$ halaman",
        },
        {
          correct: true,
          label: "$$80$$ halaman",
        },
        {
          correct: false,
          label: "$$90$$ halaman",
        },
        {
          correct: false,
          label: "$$100$$ halaman",
        },
        {
          correct: false,
          label: "$$120$$ halaman",
        },
      ],
    },
  },
};

export default item;
