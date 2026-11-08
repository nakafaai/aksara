import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "medicine-level",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Banyak obat di dalam tubuh berkurang 50 mg setiap jam.",
        },
        {
          column: 1,
          label:
            "Jika pasien hanya minum satu dosis, banyak obat pada pukul 00.00 keesokan harinya adalah 50 mg.",
        },
        {
          column: 2,
          label:
            "Tiga jam setelah dosis pertama diminum, banyak obat di dalam tubuh adalah 300 mg.",
        },
        {
          column: 1,
          label:
            "Jika pasien hanya minum satu dosis, banyak obat 30 jam setelah diminum adalah $$12{,}5$$ mg.",
        },
      ],
    },
  },
};

export default item;
