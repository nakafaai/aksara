import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\begin{pmatrix} 6 \\\\ 8 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} -8 \\\\ 6 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 4 \\\\ -3 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 6 \\\\ -8 \\end{pmatrix}$$",
        },
        {
          correct: true,
          label: "$$\\begin{pmatrix} 8 \\\\ -6 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
