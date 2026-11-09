import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Pada hari Kamis, hujan tidak turun sebelum pukul $$15.00$$.",
        },
        {
          column: 2,
          label: "Pada hari Kamis, latihan sepak bola dipindahkan ke aula.",
        },
        {
          column: 2,
          label: "Pada hari Kamis, hujan turun setelah pukul $$15.00$$.",
        },
        {
          column: 1,
          label: "Pada hari Kamis, tim basket tidak berlatih di halaman.",
        },
      ],
    },
  },
};

export default item;
