import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "commute-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$23$$" },
        { correct: false, label: "$$23{,}25$$" },
        { correct: false, label: "$$23{,}5$$" },
        { correct: true, label: "$$23{,}75$$" },
        { correct: false, label: "$$24{,}5$$" },
      ],
    },
  },
};

export default item;
