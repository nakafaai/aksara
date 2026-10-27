import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Label pemilik membuktikan seluruh perpindahan karya karena kepemilikan selalu sama dengan lokasi penyimpanan.",
        },
        {
          correct: true,
          label:
            "Kartu $$1967$$ membuktikan lukisan berada di Surabaya saat diperiksa, tetapi tidak menjelaskan siapa pemiliknya atau bagaimana riwayat penguasaan karya sejak label $$1958$$. Celah itu tetap terbuka.",
        },
        {
          correct: false,
          label:
            "Kartu kondisi lebih penting daripada label pameran karena kerusakan fisik merupakan satu-satunya bagian riwayat karya yang dapat diperiksa.",
        },
        {
          correct: false,
          label:
            "Perbedaan informasi kepemilikan dan kerusakan berarti kedua sumber membahas karya yang berbeda.",
        },
        {
          correct: false,
          label:
            "Gabungan label dan kartu kondisi menjamin bahwa setiap perpindahan karya telah tercatat lengkap.",
        },
      ],
    },
  },
};

export default item;
