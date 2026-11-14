import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "blood-donor",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Setiap donor rhesus negatif dapat memberikan darahnya kepada setiap pasien rhesus positif.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh donor dapat memberikan darahnya kepada pasien $$\\mathrm{A}^+$$.",
        },
        {
          column: 2,
          label:
            "Pasien $$\\mathrm{AB}^-$$ dapat menerima darah dari lebih banyak donor daripada pasien $$\\mathrm{O}^+$$.",
        },
        {
          column: 1,
          label:
            "Ada golongan darah pasien yang dapat menerima darah dari tepat $$4$$ donor di antara $$40$$ donor itu.",
        },
      ],
    },
  },
};

export default item;
