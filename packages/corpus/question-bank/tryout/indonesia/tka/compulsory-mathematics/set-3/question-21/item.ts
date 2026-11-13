import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "lari",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11{,}3$$ detik",
        },
        {
          correct: true,
          label: "$$13{,}8$$ detik",
        },
        {
          correct: false,
          label: "$$14{,}2$$ detik",
        },
        {
          correct: false,
          label: "$$14{,}8$$ detik",
        },
        {
          correct: false,
          label: "$$16{,}2$$ detik",
        },
      ],
    },
  },
};

export default item;
