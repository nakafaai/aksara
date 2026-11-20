import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$5$$, $$5$$ and $$4$$",
        },
        {
          correct: false,
          label: "$$5$$, $$7$$ and $$4$$",
        },
        {
          correct: false,
          label: "$$10$$, $$5$$ and $$4$$",
        },
        {
          correct: false,
          label: "$$5$$, $$5$$ and $$3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$5$$, $$5$$ dan $$4$$",
        },
        {
          correct: false,
          label: "$$5$$, $$7$$ dan $$4$$",
        },
        {
          correct: false,
          label: "$$10$$, $$5$$ dan $$4$$",
        },
        {
          correct: false,
          label: "$$5$$, $$5$$ dan $$3$$",
        },
      ],
    },
  },
};

export default item;
