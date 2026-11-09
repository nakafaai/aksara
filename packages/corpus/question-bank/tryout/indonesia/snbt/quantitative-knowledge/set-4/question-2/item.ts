import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5\\%$$" },
        { correct: false, label: "$$10\\%$$" },
        { correct: true, label: "$$11\\tfrac{1}{9}\\%$$" },
        { correct: false, label: "$$20\\%$$" },
        { correct: false, label: "$$25\\%$$" },
      ],
    },
  },
};

export default item;
