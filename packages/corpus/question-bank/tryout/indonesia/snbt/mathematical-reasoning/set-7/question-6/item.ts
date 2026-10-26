import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3:4$$",
        },
        {
          correct: true,
          label: "$$9:5$$",
        },
        {
          correct: false,
          label: "$$4:3$$",
        },
        {
          correct: false,
          label: "$$5:9$$",
        },
        {
          correct: false,
          label: "$$1:3$$",
        },
      ],
    },
  },
};

export default item;
