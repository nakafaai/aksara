import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      columns: ["No fine", "Fined"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "A magazine borrowed on Monday 1 and returned on Monday 8",
        },
        {
          column: 2,
          label: "A book borrowed on Saturday 6 and returned on Monday 22",
        },
        {
          column: 1,
          label: "A DVD borrowed on Thursday 4 and returned on Monday 8",
        },
        {
          column: 2,
          label:
            "A book borrowed on Monday 1, renewed twice in time, and returned on Tuesday 30",
        },
        {
          column: 2,
          label:
            "A magazine borrowed on Tuesday 2 and returned on Wednesday 10",
        },
      ],
    },
  },
};

export default item;
