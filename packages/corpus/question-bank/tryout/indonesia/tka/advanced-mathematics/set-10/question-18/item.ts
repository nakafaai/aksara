import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$$",
        },
        {
          correct: true,
          label: "$$\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
