import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "river-gauge",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tinggi muka air tertinggi antara pukul 06.00 dan 14.00 adalah $$340\\text{ cm}$$.",
        },
        {
          column: 2,
          label:
            "Selama curah hujan yang tiba di papan duga lebih dari $$0\\text{ mm}$$ per jam, tinggi muka air tidak pernah turun.",
        },
        {
          column: 1,
          label:
            "Seandainya tidak ada pintu air, tinggi muka air tertinggi antara pukul 06.00 dan 14.00 akan lebih dari $$400\\text{ cm}$$.",
        },
        {
          column: 1,
          label:
            "Status Siaga pertama kali tercapai setelah hujan terlebat di hulu berhenti.",
        },
      ],
    },
  },
};

export default item;
