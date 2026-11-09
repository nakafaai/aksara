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
          column: 1,
          label: "$$(A+B)^T=A^T+B^T$$",
        },
        {
          column: 2,
          label: "$$(AB)^T=A^TB^T$$",
        },
        {
          column: 2,
          label: "$$\\det(A+B)=\\det A+\\det B$$",
        },
        {
          column: 1,
          label: "$$\\det(AB)=24$$",
        },
      ],
    },
  },
};

export default item;
