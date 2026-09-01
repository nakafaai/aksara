import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label pemilik membuktikan seluruh perpindahan karya karena kepemilikan selalu sama dengan lokasi penyimpanan.",
        },
        {
          isCorrect: true,
          label:
            "Kartu 1967 membuktikan lukisan berada di Surabaya saat diperiksa, tetapi tidak menjelaskan siapa pemiliknya atau bagaimana karya berpindah dari Bandung; celah itu tetap terbuka.",
        },
        {
          isCorrect: false,
          label:
            "Kartu kondisi lebih penting daripada label pameran karena kerusakan fisik merupakan satu-satunya bagian riwayat karya yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan informasi kepemilikan dan kerusakan berarti kedua sumber membahas karya yang berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Gabungan label dan kartu kondisi menjamin bahwa setiap perpindahan karya telah tercatat lengkap.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
