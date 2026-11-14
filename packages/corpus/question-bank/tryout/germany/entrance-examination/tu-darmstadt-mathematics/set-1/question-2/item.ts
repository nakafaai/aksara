import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-2<x\\le0$$",
        },
        {
          correct: false,
          label: "$$-2\\le x\\le0$$ oder $$x=3$$",
        },
        {
          correct: false,
          label: "$$x\\le0$$ oder $$x=3$$",
        },
        {
          correct: false,
          label: "$$-2<x\\le0$$ oder $$x\\ge3$$",
        },
        {
          correct: true,
          label: "$$-2<x\\le0$$ oder $$x=3$$",
        },
        {
          correct: false,
          label: "$$x<-2$$ oder $$x\\ge0$$",
        },
      ],
    },
  },
};

export default item;
