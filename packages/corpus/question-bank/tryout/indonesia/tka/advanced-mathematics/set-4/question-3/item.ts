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
          column: 1,
          label: "$$P+Q=\\begin{pmatrix} 3 & -1 \\\\ 2 & 4 \\end{pmatrix}$$",
        },
        {
          column: 2,
          label: "$$\\det P=-6$$",
        },
        {
          column: 2,
          label: "$$Q^T=Q$$",
        },
        {
          column: 1,
          label: "$$2P-Q=\\begin{pmatrix} 0 & -5 \\\\ 7 & -4 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
