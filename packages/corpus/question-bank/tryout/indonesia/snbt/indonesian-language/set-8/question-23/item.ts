import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap nilai menyimpang harus dimasukkan ke perhitungan agar peneliti tidak dituduh memilih data.",
        },
        {
          isCorrect: false,
          label:
            "Setiap nilai menyimpang harus dihapus setelah pengukuran ulang menghasilkan angka yang lebih berdekatan.",
        },
        {
          isCorrect: false,
          label:
            "Median tiga pengukuran selalu menjadi nilai benar sehingga ketelitian alat tidak perlu dilaporkan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai menyimpang perlu diselidiki, diberi status berdasarkan bukti, dan tetap disimpan agar keputusan memasukkan atau mengecualikannya dapat diaudit.",
        },
        {
          isCorrect: false,
          label:
            "Dua hasil yang berbeda sebaiknya langsung dirata-ratakan sebelum penyebab perbedaannya diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
