import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12$$ hours, $$8\\text{ cm}^3$$ per hour",
        },
        {
          correct: false,
          label: "$$24$$ hours, $$4\\text{ cm}^3$$ per hour",
        },
        {
          correct: false,
          label: "$$16$$ hours, $$12\\text{ cm}^3$$ per hour",
        },
        {
          correct: true,
          label: "$$8$$ hours, $$12\\text{ cm}^3$$ per hour",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12$$ jam, $$8\\text{ cm}^3$$ sejam",
        },
        {
          correct: false,
          label: "$$24$$ jam, $$4\\text{ cm}^3$$ sejam",
        },
        {
          correct: false,
          label: "$$16$$ jam, $$12\\text{ cm}^3$$ sejam",
        },
        {
          correct: true,
          label: "$$8$$ jam, $$12\\text{ cm}^3$$ sejam",
        },
      ],
    },
  },
};

export default item;
