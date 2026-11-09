import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "bank-queue",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5$$ menit",
        },
        {
          correct: true,
          label: "$$5{,}5$$ menit",
        },
        {
          correct: false,
          label: "$$6$$ menit",
        },
        {
          correct: false,
          label: "$$8$$ menit",
        },
        {
          correct: false,
          label: "$$31$$ menit",
        },
      ],
    },
  },
};

export default item;
