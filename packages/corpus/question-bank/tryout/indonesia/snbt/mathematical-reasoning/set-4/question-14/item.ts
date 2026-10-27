import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7\\text{ hari}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ hari}$$",
        },
        {
          correct: false,
          label: "$$9\\text{ hari}$$",
        },
        {
          correct: true,
          label: "$$10\\text{ hari}$$",
        },
        {
          correct: false,
          label: "$$11\\text{ hari}$$",
        },
      ],
    },
  },
};

export default item;
