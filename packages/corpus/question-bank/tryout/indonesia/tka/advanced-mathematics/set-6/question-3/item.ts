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
          label: "$$\\det M=0$$",
        },
        {
          column: 1,
          label: "Matriks $$M$$ simetris, yaitu $$M^T=M$$.",
        },
        {
          column: 2,
          label: "Matriks $$M$$ memiliki invers.",
        },
        {
          column: 2,
          label: "$$M^2=4M$$",
        },
      ],
    },
  },
};

export default item;
