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
          label: "$$\\begin{pmatrix} 7 \\\\ -4 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} -7 \\\\ 4 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} -10 \\\\ -3 \\end{pmatrix}$$",
        },
        {
          correct: true,
          label: "$$\\begin{pmatrix} -3 \\\\ -2 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
