import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "factory-shifts",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Pada hari Selasa, mesin P beroperasi lebih sedikit jam daripada pada hari Senin.",
        },
        {
          column: 2,
          label: "Perawatan mesin P dimulai pada jam-jam yang sama setiap hari.",
        },
        {
          column: 1,
          label:
            "Pada setiap hari dari Senin sampai Rabu, mesin P menghasilkan komponen baik lebih banyak daripada mesin Q.",
        },
        {
          column: 2,
          label:
            "Selama jam shift dari Senin sampai Rabu, kedua mesin bersama-sama selalu menghasilkan $$195$$ komponen baik per jam.",
        },
      ],
    },
  },
};

export default item;
