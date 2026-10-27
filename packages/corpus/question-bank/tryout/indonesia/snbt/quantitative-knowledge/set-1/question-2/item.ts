import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\begin{pmatrix} 4 & 1 \\\\ 7 & 9 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 9 & 4 \\\\ 14 & 10 \\end{pmatrix}$$",
        },
        {
          correct: true,
          label: "$$\\begin{pmatrix} 8 & -1 \\\\ 15 & 10 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 8 & 5 \\\\ 13 & 6 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 11 & 5 \\\\ 10 & 6 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
