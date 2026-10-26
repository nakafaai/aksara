import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "phipllowg cz ?hmmphng",
        },
        {
          correct: false,
          label: "?hhmmpowg cz ?hmmphng",
        },
        {
          correct: false,
          label: "ng?hmmphowg ?hmmp cz",
        },
        {
          correct: false,
          label: "ng?hmmph ?hmmpowg cz",
        },
        {
          correct: true,
          label: "?hhmmphng ?hmmpowg cz",
        },
      ],
    },
  },
};

export default item;
