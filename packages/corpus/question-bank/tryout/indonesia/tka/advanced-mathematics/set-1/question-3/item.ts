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
          label: "$$\\det(2A)=14$$",
        },
        {
          column: 1,
          label: "$$A+B=\\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$$",
        },
        {
          column: 2,
          label: "$$A^{-1}=\\frac17\\begin{pmatrix} 3 & -1 \\\\ 1 & 2 \\end{pmatrix}$$",
        },
        {
          column: 1,
          label: "$$\\det(AB)=14$$",
        },
      ],
    },
  },
};

export default item;
