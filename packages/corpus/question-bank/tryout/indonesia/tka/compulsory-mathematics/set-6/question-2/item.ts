import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "phone-storage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$244$$ menit",
        },
        {
          correct: false,
          label: "$$245$$ menit",
        },
        {
          correct: false,
          label: "$$256$$ menit",
        },
        {
          correct: false,
          label: "$$490$$ menit",
        },
        {
          correct: false,
          label: "$$494$$ menit",
        },
      ],
    },
  },
};

export default item;
