import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Benang putih tetap berarti kerusakan dari awal sampai akhir, sedangkan perubahan Wulan hanya berkaitan dengan sistem katalog.",
        },
        {
          correct: false,
          label:
            "Benang putih membuktikan semua kostum lama harus dipertahankan karena usia benda selalu menentukan nilainya.",
        },
        {
          correct: false,
          label:
            "Benang putih hanya menandai perpindahan gedung dan tidak memengaruhi cara Wulan menilai label lama.",
        },
        {
          correct: false,
          label:
            "Benang putih memperoleh arti baru semata-mata karena Raka membaca nama Mira, tanpa kaitan dengan keputusan Wulan sebelumnya.",
        },
        {
          correct: true,
          label:
            "Benang putih bergerak dari tanda benda yang hendak disingkirkan menjadi tanda hubungan yang dirawat tanpa menyembunyikan kerapuhannya.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
