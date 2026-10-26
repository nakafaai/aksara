import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Catatan pembangunan independen juga membedakan tanggal perpindahan kelas dan tanggal peresmian.",
        },
        {
          correct: true,
          label:
            "Surat dari masa perpindahan yang baru ditemukan dan telah diverifikasi menunjukkan bahwa semua kelas pindah pada hari yang sama.",
        },
        {
          correct: false,
          label:
            "Pengunjung lebih jarang tertukar antara kedua tanggal ketika keterangan diletakkan tepat di bawah foto yang bersangkutan.",
        },
        {
          correct: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
        {
          correct: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
