import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a<-2$$ oder $$a>3$$",
        },
        {
          correct: false,
          label: "$$a>0$$",
        },
        {
          correct: true,
          label: "$$a>3$$",
        },
        {
          correct: false,
          label: "$$-6<a<-2$$ oder $$a>3$$",
        },
        {
          correct: false,
          label: "$$a\\ge3$$",
        },
        {
          correct: false,
          label: "$$-2<a<3$$",
        },
      ],
    },
  },
};

export default item;
