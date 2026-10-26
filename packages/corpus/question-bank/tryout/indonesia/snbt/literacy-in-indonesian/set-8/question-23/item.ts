import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap nilai menyimpang harus dimasukkan ke perhitungan agar peneliti tidak dituduh memilih data.",
        },
        {
          correct: false,
          label:
            "Setiap nilai menyimpang harus dihapus setelah pengukuran ulang menghasilkan angka yang lebih berdekatan.",
        },
        {
          correct: false,
          label:
            "Median tiga pengukuran selalu menjadi nilai benar sehingga ketelitian alat tidak perlu dilaporkan.",
        },
        {
          correct: true,
          label:
            "Nilai menyimpang perlu diselidiki, diberi status berdasarkan bukti, dan tetap disimpan agar keputusan memasukkan atau mengecualikannya dapat diaudit.",
        },
        {
          correct: false,
          label:
            "Dua hasil yang berbeda sebaiknya langsung dirata-ratakan sebelum penyebab perbedaannya diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
