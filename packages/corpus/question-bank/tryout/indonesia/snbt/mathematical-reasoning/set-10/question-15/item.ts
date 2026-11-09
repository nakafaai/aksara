import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "juice-mix",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Menambahkan air ke suatu campuran mengubah volume sari jeruk di dalam campuran itu.",
        },
        {
          column: 1,
          label:
            "Mencampur sirup A dan sirup B sama banyak menghasilkan kadar sari jeruk $$40\\%$$.",
        },
        {
          column: 1,
          label:
            "Kadar sari jeruk campuran sirup A dan sirup B, tanpa air, selalu berada di antara $$20\\%$$ dan $$60\\%$$.",
        },
        {
          column: 2,
          label:
            "Mencampur sirup A dengan sedikit air dapat menghasilkan kadar sari jeruk $$70\\%$$.",
        },
      ],
    },
  },
};

export default item;
