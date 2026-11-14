import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4$$ cm",
        },
        {
          correct: false,
          label: "$$8$$ cm",
        },
        {
          correct: false,
          label: "$$10$$ cm",
        },
        {
          correct: false,
          label: "$$12$$ cm",
        },
        {
          correct: false,
          label: "$$16$$ cm",
        },
      ],
    },
  },
};

export default item;
