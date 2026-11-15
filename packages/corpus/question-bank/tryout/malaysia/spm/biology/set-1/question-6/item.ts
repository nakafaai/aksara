import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-composition-in-a-cell",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1\\%$$ and $$1\\%$$",
        },
        {
          correct: true,
          label: "$$4\\%$$ and $$4\\%$$",
        },
        {
          correct: false,
          label: "$$4\\%$$ and $$8\\%$$",
        },
        {
          correct: false,
          label: "$$8\\%$$ and $$4\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1\\%$$ dan $$1\\%$$",
        },
        {
          correct: true,
          label: "$$4\\%$$ dan $$4\\%$$",
        },
        {
          correct: false,
          label: "$$4\\%$$ dan $$8\\%$$",
        },
        {
          correct: false,
          label: "$$8\\%$$ dan $$4\\%$$",
        },
      ],
    },
  },
};

export default item;
