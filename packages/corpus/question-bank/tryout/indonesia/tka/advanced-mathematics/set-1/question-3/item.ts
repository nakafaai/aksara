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
          label: "$$AB=BA$$",
        },
        {
          column: 1,
          label: "$$\\det(AB)=1$$",
        },
        {
          column: 2,
          label: "$$(AB)^T=A^TB^T$$",
        },
        {
          column: 1,
          label: "$$A^2=\\begin{pmatrix} 1 & 4 \\\\ 0 & 1 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
