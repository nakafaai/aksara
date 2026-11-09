import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "run-times",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$27$$ menit",
        },
        {
          correct: false,
          label: "$$28$$ menit",
        },
        {
          correct: true,
          label: "$$28{,}5$$ menit",
        },
        {
          correct: false,
          label: "$$29$$ menit",
        },
        {
          correct: false,
          label: "$$29{,}5$$ menit",
        },
      ],
    },
  },
};

export default item;
