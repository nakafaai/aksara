import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-1<x<4$$",
        },
        {
          correct: false,
          label: "$$1\\le x<4$$",
        },
        {
          correct: true,
          label: "$$-5\\le x<4$$",
        },
        {
          correct: false,
          label: "$$x<4$$",
        },
        {
          correct: false,
          label: "$$-5\\le x\\le4$$",
        },
        {
          correct: false,
          label: "$$x>4$$",
        },
      ],
    },
  },
};

export default item;
