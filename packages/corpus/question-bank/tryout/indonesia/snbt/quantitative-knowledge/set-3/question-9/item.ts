import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$25^\\circ$$",
        },
        {
          correct: false,
          label: "$$15^\\circ$$",
        },
        {
          correct: false,
          label: "$$20^\\circ$$",
        },
        {
          correct: false,
          label: "$$30^\\circ$$",
        },
        {
          correct: false,
          label: "$$35^\\circ$$",
        },
      ],
    },
  },
};

export default item;
