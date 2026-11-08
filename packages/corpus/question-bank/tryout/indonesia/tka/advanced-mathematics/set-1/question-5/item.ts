import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "furniture-workshop",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0$$ kursi dan $$30$$ meja",
        },
        {
          correct: false,
          label: "$$0$$ kursi dan $$40$$ meja",
        },
        {
          correct: false,
          label: "$$20$$ kursi dan $$30$$ meja",
        },
        {
          correct: false,
          label: "$$30$$ kursi dan $$20$$ meja",
        },
        {
          correct: false,
          label: "$$60$$ kursi dan $$0$$ meja",
        },
      ],
    },
  },
};

export default item;
