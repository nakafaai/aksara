import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "scholarship-score",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$20\\le x\\le29$$" },
        { correct: false, label: "$$20\\le x\\le30$$" },
        { correct: false, label: "$$20\\le x\\le35$$" },
        { correct: false, label: "$$20\\le x\\le40$$, yaitu semua nilai $$x$$" },
        { correct: false, label: "$$31\\le x\\le40$$" },
      ],
    },
  },
};

export default item;
