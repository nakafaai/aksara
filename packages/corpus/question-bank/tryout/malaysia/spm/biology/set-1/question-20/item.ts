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
          label: "$$400$$ and $$2600$$",
        },
        {
          correct: false,
          label: "$$600$$ and $$2600$$",
        },
        {
          correct: false,
          label: "$$800$$ and $$2800$$",
        },
        {
          correct: true,
          label: "$$400$$ and $$2400$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$400$$ dan $$2600$$",
        },
        {
          correct: false,
          label: "$$600$$ dan $$2600$$",
        },
        {
          correct: false,
          label: "$$800$$ dan $$2800$$",
        },
        {
          correct: true,
          label: "$$400$$ dan $$2400$$",
        },
      ],
    },
  },
};

export default item;
