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
          label: "$$(CD)^T=C^TD^T$$",
        },
        {
          column: 1,
          label: "Matriks $$C+D$$ tidak memiliki invers.",
        },
        {
          column: 2,
          label: "$$\\det\\left(C^3\\right)=8$$",
        },
        {
          column: 1,
          label:
            "$$D^{-1}=\\frac12\\begin{pmatrix} 2 & -3 \\\\ 0 & 1 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
