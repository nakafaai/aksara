import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "metabolism-and-enzymes",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$24$$ minutes",
        },
        {
          correct: false,
          label: "$$6$$ minutes",
        },
        {
          correct: false,
          label: "$$12$$ minutes",
        },
        {
          correct: false,
          label: "$$8$$ minutes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$24$$ minit",
        },
        {
          correct: false,
          label: "$$6$$ minit",
        },
        {
          correct: false,
          label: "$$12$$ minit",
        },
        {
          correct: false,
          label: "$$8$$ minit",
        },
      ],
    },
  },
};

export default item;
