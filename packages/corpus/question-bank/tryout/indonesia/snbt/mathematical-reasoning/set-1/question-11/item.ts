import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "commute-survey",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sebanyak $$27{,}5\\%$$ siswa memerlukan waktu tempuh 30 menit atau lebih.",
        },
        {
          column: 2,
          label:
            "Kuartil atas data waktu tempuh terletak pada kelas 20-29 menit.",
        },
        {
          column: 2,
          label:
            "Lebih dari separuh siswa memerlukan waktu tempuh kurang dari 20 menit.",
        },
        {
          column: 1,
          label:
            "Banyak siswa dengan waktu tempuh kurang dari 10 menit sama dengan banyak siswa dengan waktu tempuh 40 menit atau lebih.",
        },
      ],
    },
  },
};

export default item;
