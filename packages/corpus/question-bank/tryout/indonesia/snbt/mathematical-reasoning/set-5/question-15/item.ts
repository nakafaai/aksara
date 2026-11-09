import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "solar-panels",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika seluruh pemakaian listrik dipenuhi panel, penghematan biaya listrik per bulan adalah $$\\text{Rp}450{.}000{,}00$$.",
        },
        {
          column: 1,
          label: "Satu panel menghasilkan 0,9 kWh energi per hari.",
        },
        {
          column: 1,
          label:
            "Jika pemakaian listrik keluarga itu naik $$20\\%$$, diperlukan 12 panel agar seluruh pemakaian terpenuhi.",
        },
        {
          column: 2,
          label:
            "Biaya pemasangan 10 panel tertutup oleh penghematan biaya listrik dalam 4 tahun.",
        },
      ],
    },
  },
};

export default item;
