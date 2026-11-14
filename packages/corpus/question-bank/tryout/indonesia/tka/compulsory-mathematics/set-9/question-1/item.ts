import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cookie-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$120$$ g",
        },
        {
          correct: false,
          label: "$$336$$ g",
        },
        {
          correct: false,
          label: "$$600$$ g",
        },
        {
          correct: true,
          label: "$$750$$ g",
        },
        {
          correct: false,
          label: "$$900$$ g",
        },
      ],
    },
  },
};

export default item;
