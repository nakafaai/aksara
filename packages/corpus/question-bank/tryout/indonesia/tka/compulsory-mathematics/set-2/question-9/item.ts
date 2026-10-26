import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "$$u_1=5$$",
        },
        {
          column: 1,
          label: "Bedanya adalah $$6$$.",
        },
        {
          column: 1,
          label: "$$u_{10}=59$$",
        },
        {
          column: 1,
          label: "$$S_{10}=320$$",
        },
        {
          column: 2,
          label: "$$u_5=31$$",
        },
      ],
    },
  },
};

export default item;
