import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "travel-time",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika kelima siswa pada kelas $$25$$ sampai $$29$$ ternyata salah dicatat dan seharusnya masuk kelas $$5$$ sampai $$9$$, median tetap terletak pada kelas $$15$$ sampai $$19$$.",
        },
        {
          column: 2,
          label:
            "Jika kelima siswa pada kelas $$25$$ sampai $$29$$ ternyata salah dicatat dan seharusnya masuk kelas $$5$$ sampai $$9$$, rata-rata yang dihitung dengan titik tengah kelas turun lebih dari $$3$$ menit.",
        },
        {
          column: 2,
          label:
            "Jika kelima siswa pada kelas $$25$$ sampai $$29$$ tidak diikutkan, rata-rata yang dihitung dengan titik tengah kelas menjadi kurang dari $$16$$ menit (tanpa pembulatan).",
        },
        {
          column: 1,
          label:
            "Banyak siswa yang lama perjalanan tercatatnya paling sedikit $$10$$ menit dan kurang dari $$25$$ menit adalah $$31$$.",
        },
      ],
    },
  },
};

export default item;
