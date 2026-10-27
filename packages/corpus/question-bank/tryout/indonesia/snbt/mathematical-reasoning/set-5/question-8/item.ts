import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7{,}07$$",
        },
        {
          correct: false,
          label: "$$7{,}16$$",
        },
        {
          correct: false,
          label: "$$7{,}10$$",
        },
        {
          correct: false,
          label: "$$7{,}04$$",
        },
        {
          correct: false,
          label: "$$7{,}01$$",
        },
      ],
    },
  },
};

export default item;
