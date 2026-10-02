import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Hasil awal menunjukkan potensi, masalah akses mengungkap ketimpangan, dan perbaikan layanan menguji penjelasan tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan biaya pencucian, lalu bagian berikutnya memilih jumlah uang jaminan berdasarkan biaya itu.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menyatakan sistem gagal total, lalu bagian berikutnya menghentikan pengembalian uang bagi pengunjung.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal memindahkan loket, lalu bagian berikutnya membandingkan hasil dengan data dari festival tahun sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membuktikan keberhasilan penuh, lalu bagian berikutnya hanya menjelaskan penerapan tetap tanpa evaluasi lagi.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
