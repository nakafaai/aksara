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
          label: "$$S^2=I$$",
        },
        {
          column: 2,
          label: "$$\\det S=1$$",
        },
        {
          column: 1,
          label: "$$S^{-1}=S$$",
        },
        {
          column: 2,
          label: "$$SA=AS$$ untuk setiap matriks $$A$$ berordo $$2\\times2$$.",
        },
      ],
    },
  },
};

export default item;
