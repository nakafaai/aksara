import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "$$A+B$$ terdefinisi.",
        },
        {
          column: 1,
          label: "$$AB$$ terdefinisi dan berordo $$2\\times2$$.",
        },
        {
          column: 2,
          label: "$$BA$$ terdefinisi dan berordo $$2\\times2$$.",
        },
        {
          column: 1,
          label: "$$A^TB^T$$ terdefinisi dan berordo $$3\\times3$$.",
        },
      ],
    },
  },
};

export default item;
