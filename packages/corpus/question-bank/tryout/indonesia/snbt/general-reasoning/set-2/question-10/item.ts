import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1$$ apel besar dan $$1$$ jeruk kecil",
        },
        {
          correct: false,
          label: "$$2$$ apel besar",
        },
        {
          correct: false,
          label: "$$2$$ apel kecil",
        },
        {
          correct: false,
          label: "$$2$$ jeruk besar",
        },
        {
          correct: false,
          label: "$$2$$ jeruk kecil",
        },
      ],
    },
  },
};

export default item;
