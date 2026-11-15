import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$-1\\le x<0$$ oder $$3<x\\le4$$",
        },
        {
          correct: false,
          label: "$$-1\\le x\\le4$$",
        },
        {
          correct: false,
          label: "$$x\\le-1$$ oder $$x\\ge4$$",
        },
        {
          correct: false,
          label: "$$x<0$$ oder $$x>3$$",
        },
        {
          correct: false,
          label: "$$-1<x<0$$ oder $$3<x<4$$",
        },
        {
          correct: false,
          label: "$$-1\\le x\\le0$$ oder $$3\\le x\\le4$$",
        },
      ],
    },
  },
};

export default item;
