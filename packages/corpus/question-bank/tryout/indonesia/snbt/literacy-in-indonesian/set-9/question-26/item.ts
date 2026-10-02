import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Benang putih tetap berarti kerusakan dari awal sampai akhir, sedangkan perubahan Wulan hanya berkaitan dengan sistem katalog.",
        },
        {
          isCorrect: false,
          label:
            "Benang putih membuktikan semua kostum lama harus dipertahankan karena usia benda selalu menentukan nilainya.",
        },
        {
          isCorrect: false,
          label:
            "Benang putih hanya menandai perpindahan gedung dan tidak memengaruhi cara Wulan menilai label lama.",
        },
        {
          isCorrect: false,
          label:
            "Benang putih memperoleh arti baru semata-mata karena Raka membaca nama Mira, tanpa kaitan dengan keputusan Wulan sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Benang putih bergerak dari tanda benda yang hendak disingkirkan menjadi tanda hubungan yang dirawat tanpa menyembunyikan kerapuhannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
