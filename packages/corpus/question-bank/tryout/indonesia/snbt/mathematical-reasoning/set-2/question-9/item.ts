import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "exam-scoring",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$22$$" },
        { correct: false, label: "$$24$$" },
        { correct: false, label: "$$26$$" },
        { correct: false, label: "$$27$$" },
        { correct: true, label: "$$28$$" },
      ],
    },
  },
};

export default item;
