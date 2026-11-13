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
          label: "$$(AB)^T=A^TB^T$$",
        },
        {
          column: 1,
          label: "$$\\det(A+B)=\\det A+\\det B$$",
        },
        {
          column: 2,
          label:
            "Untuk setiap bilangan real $$k$$ berlaku $$\\det(A+kB)=\\det A+k\\det B$$.",
        },
      ],
    },
  },
};

export default item;
