import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10\\%$$" },
        { correct: false, label: "$$16\\tfrac23\\%$$" },
        { correct: true, label: "$$20\\%$$" },
        { correct: false, label: "$$25\\%$$" },
        { correct: false, label: "$$33\\tfrac13\\%$$" },
      ],
    },
  },
};

export default item;
