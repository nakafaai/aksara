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
            "Daftar peminjaman lebih tepat untuk mengetahui pemahaman peserta karena mencatat $$18$$ bulan, jauh lebih banyak daripada tujuh pertemuan.",
        },
        {
          correct: false,
          label:
            "Catatan fasilitator mewakili seluruh peserta karena dibuat langsung saat percakapan klub berlangsung.",
        },
        {
          correct: true,
          label:
            "Daftar peminjaman menunjukkan buku yang tercatat keluar, sedangkan catatan fasilitator memberi sebagian pengalaman peserta yang berbicara. Keduanya menjawab pertanyaan yang berbeda.",
        },
        {
          correct: false,
          label:
            "Menggabungkan kedua sumber membuktikan bahwa setiap peminjaman setelah jadwal berubah dilakukan oleh pekerja muda yang baru bergabung.",
        },
        {
          correct: false,
          label:
            "Perbedaan tujuan pencatatan tidak memengaruhi simpulan selama kedua sumber berasal dari klub yang sama.",
        },
      ],
    },
  },
};

export default item;
