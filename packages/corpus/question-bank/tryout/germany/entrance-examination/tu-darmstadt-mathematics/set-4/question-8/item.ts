import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$c<b<a$$",
        },
        {
          correct: false,
          label: "$$b<a<c$$",
        },
        {
          correct: false,
          label: "$$a<c<b$$",
        },
        {
          correct: false,
          label: "$$c<a<b$$",
        },
        {
          correct: false,
          label: "$$b<c<a$$",
        },
        {
          correct: true,
          label: "$$a<b<c$$",
        },
      ],
    },
  },
};

export default item;
