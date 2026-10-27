import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: true,
          label: "$$32$$",
        },
        {
          correct: false,
          label: "$$28$$",
        },
        {
          correct: false,
          label: "$$36$$",
        },
      ],
    },
  },
};

export default item;
