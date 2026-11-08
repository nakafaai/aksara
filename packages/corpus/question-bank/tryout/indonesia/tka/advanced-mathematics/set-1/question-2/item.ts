import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\begin{pmatrix} 3 & -1 \\\\ 2 & -1 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 7 & 2 \\\\ -17 & -5 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 13 & 7 \\\\ 2 & 1 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 17 & 6 \\\\ 3 & 1 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
