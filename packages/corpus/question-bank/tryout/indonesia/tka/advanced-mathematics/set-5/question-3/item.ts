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
          label: "$$\\det\\left(A^T\\right)=-1$$",
        },
        {
          column: 2,
          label: "$$A+A^T=\\begin{pmatrix} 8 & 3 \\\\ 1 & 2 \\end{pmatrix}$$",
        },
        {
          column: 1,
          label:
            "$$A^{-1}=\\begin{pmatrix} 1 & -3 \\\\ -1 & 4 \\end{pmatrix}$$",
        },
        {
          column: 1,
          label: "$$\\det\\left(A^2\\right)=1$$",
        },
      ],
    },
  },
};

export default item;
