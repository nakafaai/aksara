import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\begin{pmatrix}7\\\\-7\\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix}3\\\\-1\\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix}-10\\\\-12\\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix}-3\\\\-1\\end{pmatrix}$$",
        },
        {
          correct: true,
          label: "$$\\begin{pmatrix}-3\\\\1\\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
