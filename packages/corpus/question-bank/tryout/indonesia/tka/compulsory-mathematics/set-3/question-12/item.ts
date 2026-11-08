import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "$$AC=8\\sqrt2\\text{ cm}$$",
        },
        {
          column: 1,
          label: "$$AD=16\\text{ cm}$$",
        },
        {
          column: 1,
          label: "Luas ubin itu $$96\\sqrt3\\text{ cm}^2$$.",
        },
        {
          column: 2,
          label: "Luas segitiga $$ACE$$ sama dengan sepertiga luas ubin.",
        },
      ],
    },
  },
};

export default item;
