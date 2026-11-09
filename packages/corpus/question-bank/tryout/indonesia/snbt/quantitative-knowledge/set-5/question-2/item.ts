import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$a<b<c$$" },
        { correct: false, label: "$$c<b<a$$" },
        { correct: false, label: "$$b<a<c$$" },
        { correct: false, label: "$$a<c<b$$" },
        { correct: false, label: "$$c<a<b$$" },
      ],
    },
  },
};

export default item;
