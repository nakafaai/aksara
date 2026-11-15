import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "fire-drill",
  versions: {
    en: {
      columns: [
        "Within $$8$$ minutes",
        "After $$8$$ minutes but within $$12$$",
        "After $$12$$ minutes",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Class 11B",
        },
        {
          column: 1,
          label: "Class 11C",
        },
        {
          column: 2,
          label: "Class 11D",
        },
        {
          column: 2,
          label: "Class 12A",
        },
        {
          column: 3,
          label: "Class 12B",
        },
        {
          column: 1,
          label: "Class 10C",
        },
      ],
    },
  },
};

export default item;
