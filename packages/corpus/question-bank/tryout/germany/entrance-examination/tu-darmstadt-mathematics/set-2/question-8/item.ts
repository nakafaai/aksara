import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a=9$$",
        },
        {
          correct: true,
          label: "$$a\\le0$$ oder $$a=9$$",
        },
        {
          correct: false,
          label: "$$a<0$$ oder $$a=9$$",
        },
        {
          correct: false,
          label: "$$a\\le0$$",
        },
        {
          correct: false,
          label: "$$0<a<9$$",
        },
        {
          correct: false,
          label: "$$a<0$$",
        },
      ],
    },
  },
};

export default item;
