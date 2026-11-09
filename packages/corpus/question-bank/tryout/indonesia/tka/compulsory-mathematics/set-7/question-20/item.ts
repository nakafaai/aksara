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
          correct: false,
          label: "$$15$$ m",
        },
        {
          correct: false,
          label: "$$16{,}2$$ m",
        },
        {
          correct: false,
          label: "$$27$$ m",
        },
        {
          correct: false,
          label: "$$36$$ m",
        },
        {
          correct: true,
          label: "$$45$$ m",
        },
      ],
    },
  },
};

export default item;
