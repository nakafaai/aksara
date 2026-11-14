import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4<x<6$$",
        },
        {
          correct: false,
          label: "$$-2<x<6$$",
        },
        {
          correct: false,
          label: "$$0<x<4$$",
        },
        {
          correct: false,
          label: "$$x<0$$ oder $$x>4$$",
        },
        {
          correct: false,
          label: "$$-2\\le x\\le0$$ oder $$4\\le x\\le6$$",
        },
        {
          correct: true,
          label: "$$-2<x<0$$ oder $$4<x<6$$",
        },
      ],
    },
  },
};

export default item;
