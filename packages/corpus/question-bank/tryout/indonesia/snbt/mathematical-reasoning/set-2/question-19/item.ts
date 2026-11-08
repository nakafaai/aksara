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
          label: "Banyak obat di dalam tubuh berkurang 45 mg setiap jam.",
        },
        {
          column: 1,
          label:
            "Jika pasien hanya minum satu dosis, banyak obat pada pukul 06.00 keesokan harinya adalah 45 mg.",
        },
        {
          column: 2,
          label:
            "Empat jam setelah dosis pertama diminum, banyak obat di dalam tubuh adalah 270 mg.",
        },
        {
          column: 1,
          label:
            "Jika pasien hanya minum satu dosis, banyak obat 40 jam setelah diminum adalah $$11{,}25$$ mg.",
        },
      ],
    },
  },
};

export default item;
