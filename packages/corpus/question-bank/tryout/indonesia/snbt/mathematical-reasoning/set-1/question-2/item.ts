import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "home-battery",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada hari itu, energi yang terbuang lebih banyak daripada energi yang dibeli dari PLN.",
        },
        {
          column: 2,
          label:
            "Jika kapasitas baterai $$10\\text{ kWh}$$, energi yang dibeli dari PLN pada pukul 17.00 sampai 22.00 kurang dari setengah energi yang dibeli pada jam yang sama dengan baterai $$6\\text{ kWh}$$.",
        },
        {
          column: 1,
          label:
            "Jika tidak ada aturan cadangan sehingga baterai boleh kosong, total biaya PLN hari itu berkurang $$\\text{Rp}3{.}500{,}00$$.",
        },
        {
          column: 2,
          label:
            "Jika panel menghasilkan $$1\\text{ kWh}$$ lebih banyak pada setiap jam dari pukul 07.00 sampai 17.00, keluarga itu sama sekali tidak perlu membeli listrik PLN pada hari itu.",
        },
      ],
    },
  },
};

export default item;
