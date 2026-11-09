import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10\\%$$" },
        { correct: false, label: "$$24\\%$$" },
        { correct: false, label: "$$31\\%$$" },
        { correct: false, label: "$$32{,}5\\%$$" },
        { correct: true, label: "$$34\\%$$" },
      ],
    },
  },
};

export default item;
