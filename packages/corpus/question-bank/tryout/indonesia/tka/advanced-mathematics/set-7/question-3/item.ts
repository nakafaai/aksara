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
          label: "$$\\det(A+B)=8$$",
        },
        {
          column: 1,
          label: "$$AB=BA$$",
        },
        {
          column: 1,
          label: "$$A^3=\\begin{pmatrix} 1 & 3 \\\\ 0 & 1 \\end{pmatrix}$$",
        },
        {
          column: 2,
          label:
            "$$B^{-1}=\\begin{pmatrix} \\frac12 & -\\frac32 \\\\ 0 & \\frac12 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
