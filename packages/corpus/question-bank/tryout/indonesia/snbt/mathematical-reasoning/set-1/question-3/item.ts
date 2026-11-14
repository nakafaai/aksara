import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "electricity-tariff",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tagihan untuk pemakaian 100 kWh dalam satu bulan adalah $$\\text{Rp}120{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Kenaikan pemakaian dari 300 kWh menjadi 301 kWh menambah tagihan sebesar $$\\text{Rp}1{.}500{,}00$$.",
        },
        {
          column: 2,
          label:
            "Tagihan untuk pemakaian 200 kWh sama dengan dua kali tagihan untuk pemakaian 100 kWh.",
        },
        {
          column: 1,
          label:
            "Untuk pemakaian 400 kWh, rata-rata biaya per kWh, termasuk biaya beban, adalah $$\\text{Rp}1{.}550{,}00$$.",
        },
      ],
    },
  },
};

export default item;
