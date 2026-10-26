import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}9$$",
        },
        {
          correct: false,
          label: "$$1{,}9$$",
        },
        {
          correct: true,
          label: "$$3{,}6$$",
        },
        {
          correct: false,
          label: "$$2{,}3$$",
        },
        {
          correct: false,
          label: "$$2{,}6$$",
        },
      ],
    },
  },
};

export default item;
