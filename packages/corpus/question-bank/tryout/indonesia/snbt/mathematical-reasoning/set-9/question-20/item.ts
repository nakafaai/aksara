import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$9$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: true,
          label: "$$9{,}5$$",
        },
        {
          correct: false,
          label: "$$10{,}5$$",
        },
        {
          correct: false,
          label: "$$11$$",
        },
      ],
    },
  },
};

export default item;
