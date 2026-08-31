import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Daftar peminjaman lebih tepat untuk mengetahui pemahaman peserta karena mencatat 18 bulan, jauh lebih banyak daripada tujuh pertemuan.",
        },
        {
          isCorrect: false,
          label:
            "Catatan fasilitator mewakili seluruh peserta karena dibuat langsung saat percakapan klub berlangsung.",
        },
        {
          isCorrect: true,
          label:
            "Daftar peminjaman menunjukkan buku yang tercatat keluar, sedangkan catatan fasilitator memberi sebagian pengalaman peserta yang berbicara; keduanya menjawab pertanyaan yang berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Menggabungkan kedua sumber membuktikan bahwa setiap peminjaman setelah jadwal berubah dilakukan oleh pekerja muda yang baru bergabung.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan tujuan pencatatan tidak memengaruhi simpulan selama kedua sumber berasal dari klub yang sama.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
