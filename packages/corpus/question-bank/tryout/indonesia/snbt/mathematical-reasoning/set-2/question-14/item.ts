import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3{,}6$$ menit",
        },
        {
          correct: false,
          label: "$$7{,}2$$ menit",
        },
        {
          correct: false,
          label: "$$7{,}8$$ menit",
        },
        {
          correct: false,
          label: "$$8{,}0$$ menit",
        },
        {
          correct: true,
          label: "$$4{,}8$$ menit",
        },
      ],
    },
  },
};

export default item;
