import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Banyak siswa yang hanya mengikuti Pramuka pasti $$5$$.",
        },
        {
          column: 2,
          label: "Pasti ada siswa yang mengikuti Musik dan Pramuka sekaligus.",
        },
        {
          column: 1,
          label:
            "Banyak siswa yang mengikuti tepat dua ekstrakurikuler pasti bilangan genap.",
        },
        {
          column: 2,
          label:
            "Mungkin terdapat tepat $$9$$ siswa yang mengikuti ketiga ekstrakurikuler.",
        },
      ],
    },
  },
};

export default item;
