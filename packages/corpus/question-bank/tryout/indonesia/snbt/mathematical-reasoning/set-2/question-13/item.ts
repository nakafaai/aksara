import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}2$$ menit",
        },
        {
          correct: true,
          label: "$$16{,}8$$ menit",
        },
        {
          correct: false,
          label: "$$4{,}8$$ menit",
        },
        {
          correct: false,
          label: "$$18{,}8$$ menit",
        },
        {
          correct: false,
          label: "$$14{,}2$$ menit",
        },
      ],
    },
  },
};

export default item;
