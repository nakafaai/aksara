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
          label:
            "$$(A+B)^T=\\begin{pmatrix} 2 & 2 \\\\ 0 & 8 \\end{pmatrix}$$",
        },
        {
          column: 2,
          label: "$$\\det\\left(A^{-1}\\right)=10$$",
        },
        {
          column: 1,
          label: "$$\\det(2B)=8$$",
        },
        {
          column: 2,
          label: "$$AB=BA$$",
        },
      ],
    },
  },
};

export default item;
