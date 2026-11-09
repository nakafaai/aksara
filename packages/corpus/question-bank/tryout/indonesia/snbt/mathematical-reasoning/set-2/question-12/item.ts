import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "exam-scoring",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$40$$" },
        { correct: true, label: "$$41$$" },
        { correct: false, label: "$$81$$" },
        { correct: false, label: "$$160$$" },
        { correct: false, label: "$$201$$" },
      ],
    },
  },
};

export default item;
