import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$900$$",
        },
        {
          correct: false,
          label: "$$825$$",
        },
        {
          correct: false,
          label: "$$850$$",
        },
        {
          correct: false,
          label: "$$875$$",
        },
        {
          correct: false,
          label: "$$925$$",
        },
      ],
    },
  },
};

export default item;
