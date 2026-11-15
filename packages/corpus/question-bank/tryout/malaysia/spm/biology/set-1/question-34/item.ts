import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60$$ and $$40$$",
        },
        {
          correct: true,
          label: "$$60$$ and $$20$$",
        },
        {
          correct: false,
          label: "$$60$$ and $$15$$",
        },
        {
          correct: false,
          label: "$$30$$ and $$10$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60$$ dan $$40$$",
        },
        {
          correct: true,
          label: "$$60$$ dan $$20$$",
        },
        {
          correct: false,
          label: "$$60$$ dan $$15$$",
        },
        {
          correct: false,
          label: "$$30$$ dan $$10$$",
        },
      ],
    },
  },
};

export default item;
