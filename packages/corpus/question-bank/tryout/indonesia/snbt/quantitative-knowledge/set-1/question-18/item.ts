import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika dua siswa baru dengan nilai $$9$$ bergabung, median nilai berubah.",
        },
        {
          column: 2,
          label:
            "Jika tiga siswa baru dengan nilai $$6$$ bergabung, modus nilai tetap $$7$$.",
        },
        {
          column: 1,
          label: "Rata-rata nilai lebih kecil daripada median nilai.",
        },
        {
          column: 1,
          label:
            "Jika semua siswa dengan nilai $$5$$ dikeluarkan dari data, rata-rata nilai menjadi lebih dari $$7$$.",
        },
      ],
    },
  },
};

export default item;
