import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cooking-gas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14$$ Juli, dengan sisa gas $$0{,}6\\text{ kg}$$ ikut hilang",
        },
        {
          correct: false,
          label: "$$14$$ Juli, dengan sisa gas $$1\\text{ kg}$$ ikut hilang",
        },
        {
          correct: true,
          label: "$$15$$ Juli, dengan sisa gas $$0{,}6\\text{ kg}$$ ikut hilang",
        },
        {
          correct: false,
          label: "$$15$$ Juli, dengan sisa gas $$1{,}2\\text{ kg}$$ ikut hilang",
        },
        {
          correct: false,
          label: "$$16$$ Juli, dengan sisa gas $$0{,}8\\text{ kg}$$ ikut hilang",
        },
      ],
    },
  },
};

export default item;
