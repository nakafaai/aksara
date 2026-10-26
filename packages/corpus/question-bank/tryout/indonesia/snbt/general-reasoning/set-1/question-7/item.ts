import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$30\\%$$",
        },
        {
          correct: false,
          label: "$$10\\%$$",
        },
        {
          correct: false,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$25\\%$$",
        },
        {
          correct: false,
          label: "$$70\\%$$",
        },
      ],
    },
  },
};

export default item;
