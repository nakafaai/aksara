import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
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
          label: "$$1$$ bungkus, sisa $$50$$ g",
        },
        {
          correct: true,
          label: "$$2$$ bungkus, sisa $$25$$ g",
        },
        {
          correct: false,
          label: "$$2$$ bungkus, sisa $$100$$ g",
        },
        {
          correct: false,
          label: "$$3$$ bungkus, sisa $$150$$ g",
        },
        {
          correct: false,
          label: "$$3$$ bungkus, sisa $$225$$ g",
        },
      ],
    },
  },
};

export default item;
