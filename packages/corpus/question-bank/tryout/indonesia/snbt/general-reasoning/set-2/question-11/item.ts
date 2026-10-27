import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}1$$ juta ton",
        },
        {
          correct: false,
          label: "$$2{,}5$$ juta ton",
        },
        {
          correct: false,
          label: "$$3{,}0$$ juta ton",
        },
        {
          correct: true,
          label: "$$1{,}8$$ juta ton",
        },
        {
          correct: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
