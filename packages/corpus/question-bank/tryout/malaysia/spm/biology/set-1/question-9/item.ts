import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-division",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16$$ and $$32$$",
        },
        {
          correct: false,
          label: "$$8$$ and $$64$$",
        },
        {
          correct: true,
          label: "$$16$$ and $$64$$",
        },
        {
          correct: false,
          label: "$$16$$ and $$128$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16$$ dan $$32$$",
        },
        {
          correct: false,
          label: "$$8$$ dan $$64$$",
        },
        {
          correct: true,
          label: "$$16$$ dan $$64$$",
        },
        {
          correct: false,
          label: "$$16$$ dan $$128$$",
        },
      ],
    },
  },
};

export default item;
