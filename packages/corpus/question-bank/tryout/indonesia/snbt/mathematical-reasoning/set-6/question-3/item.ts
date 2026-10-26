import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$21\\%$$",
        },
        {
          correct: true,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$22\\%$$",
        },
        {
          correct: false,
          label: "$$25\\%$$",
        },
        {
          correct: false,
          label: "$$27\\%$$",
        },
      ],
    },
  },
};

export default item;
