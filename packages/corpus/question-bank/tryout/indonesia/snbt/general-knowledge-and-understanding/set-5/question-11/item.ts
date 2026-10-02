import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Catatan pembangunan independen juga membedakan tanggal perpindahan kelas dan tanggal peresmian.",
        },
        {
          isCorrect: true,
          label:
            "Surat dari masa perpindahan yang baru ditemukan dan telah diverifikasi menunjukkan bahwa semua kelas pindah pada hari yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung lebih jarang tertukar antara kedua tanggal ketika keterangan diletakkan tepat di bawah foto yang bersangkutan.",
        },
        {
          isCorrect: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
        {
          isCorrect: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
