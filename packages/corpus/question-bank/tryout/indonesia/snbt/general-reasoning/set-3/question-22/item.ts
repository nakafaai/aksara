import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18\\%$$",
        },
        {
          correct: false,
          label: "$$20\\%$$",
        },
        {
          correct: true,
          label: "$$22\\%$$",
        },
        {
          correct: false,
          label: "$$24\\%$$",
        },
        {
          correct: false,
          label: "$$25\\%$$",
        },
      ],
    },
  },
};

export default item;
