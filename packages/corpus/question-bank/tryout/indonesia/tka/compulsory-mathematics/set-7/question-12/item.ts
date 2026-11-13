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
          column: 1,
          label: "Prisma itu mempunyai $$15$$ rusuk, dan jumlah panjang seluruh rusuknya $$98\\text{ cm}$$.",
        },
        {
          column: 2,
          label: "Volume prisma itu lebih dari $$375\\text{ cm}^3$$.",
        },
        {
          column: 1,
          label: "Jika prisma itu diletakkan dengan sisi persegi panjang berukuran $$6\\text{ cm}\\times10\\text{ cm}$$ sebagai alas, titik tertinggi prisma berada $$8\\text{ cm}$$ di atas alas.",
        },
      ],
    },
  },
};

export default item;
