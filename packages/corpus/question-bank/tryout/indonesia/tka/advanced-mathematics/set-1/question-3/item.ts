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
          label: "$$\\det(3A)=-6$$",
        },
        {
          column: 1,
          label: "$$A-B=\\begin{pmatrix} 2 & -6 \\\\ 8 & -4 \\end{pmatrix}$$",
        },
        {
          column: 2,
          label:
            "$$A^{-1}=\\frac12\\begin{pmatrix} -4 & 2 \\\\ -5 & 3 \\end{pmatrix}$$",
        },
        {
          column: 1,
          label: "$$\\det(AB)=-24$$",
        },
      ],
    },
  },
};

export default item;
