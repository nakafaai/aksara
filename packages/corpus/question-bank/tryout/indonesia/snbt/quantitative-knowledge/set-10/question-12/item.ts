import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Rata-rata nilai kelas B lebih tinggi daripada rata-rata nilai kelas A, tetapi median nilai kedua kelas sama.",
        },
        {
          column: 2,
          label:
            "Rata-rata nilai seluruh siswa kedua kelas sama dengan rata-rata dari rata-rata kelas A dan rata-rata kelas B.",
        },
        {
          column: 1,
          label:
            "Jika seorang siswa kelas B yang nilainya $$7$$ pindah ke kelas A, rata-rata nilai kelas A naik dan rata-rata nilai kelas B juga naik.",
        },
        {
          column: 1,
          label:
            "Jika seorang siswa baru masuk ke kelas A, berapa pun nilainya, median nilai kelas A tetap $$7$$.",
        },
      ],
    },
  },
};

export default item;
