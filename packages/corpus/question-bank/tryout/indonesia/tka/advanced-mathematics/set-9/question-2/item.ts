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
          correct: false,
          label: "$$\\begin{pmatrix} 0 & 1 \\\\ -1 & 1 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 4 & 1 \\\\ 3 & 1 \\end{pmatrix}$$",
        },
        {
          correct: true,
          label: "$$\\begin{pmatrix} 2 & 1 \\\\ -3 & -1 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} -1 & -1 \\\\ 3 & 2 \\end{pmatrix}$$",
        },
        {
          correct: false,
          label: "$$\\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$$",
        },
      ],
    },
  },
};

export default item;
