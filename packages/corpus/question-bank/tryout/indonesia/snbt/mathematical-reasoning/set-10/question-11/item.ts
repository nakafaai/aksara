import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-photo",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Banyak susunan dengan Citra di posisi tengah adalah 24.",
        },
        {
          column: 1,
          label:
            "Banyak susunan dengan Ani di sebelah kiri Budi, tidak harus berdampingan, sama dengan banyak susunan dengan Budi di sebelah kiri Ani.",
        },
        {
          column: 2,
          label:
            "Jika hanya 3 dari 5 siswa itu yang berfoto berjajar dan urutan dari kiri ke kanan diperhatikan, banyak susunannya adalah 10.",
        },
        {
          column: 2,
          label:
            "Banyak susunan dengan Dodi dan Eka menempati kedua ujung baris adalah 6.",
        },
      ],
    },
  },
};

export default item;
