import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30^\\circ$$",
        },
        {
          correct: false,
          label: "$$40^\\circ$$",
        },
        {
          correct: true,
          label: "$$20^\\circ$$",
        },
        {
          correct: false,
          label: "$$50^\\circ$$",
        },
        {
          correct: false,
          label: "$$80^\\circ$$",
        },
      ],
    },
  },
};

export default item;
