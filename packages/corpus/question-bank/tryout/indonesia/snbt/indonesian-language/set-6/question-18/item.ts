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
            "Label pameran membantu menelusuri kepemilikan, sedangkan kartu kondisi mencatat perpindahan dan kerusakan; keduanya memperluas riwayat karya, tetapi celah waktu tanpa catatan tetap tidak boleh diisi dengan dugaan.",
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
