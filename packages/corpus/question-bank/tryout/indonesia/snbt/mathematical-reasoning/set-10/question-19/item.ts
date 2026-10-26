import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4\\sqrt{22}$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{13}$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{18}$$",
        },
        {
          correct: false,
          label: "$$8\\sqrt6$$",
        },
        {
          correct: false,
          label: "$$8\\sqrt{11}$$",
        },
      ],
    },
  },
};

export default item;
