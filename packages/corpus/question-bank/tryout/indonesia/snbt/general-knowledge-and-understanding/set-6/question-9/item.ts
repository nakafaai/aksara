import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Hasil awal menunjukkan potensi, masalah akses mengungkap ketimpangan, dan perbaikan layanan menguji penjelasan tersebut.",
        },
        {
          correct: false,
          label:
            "Bagian awal menetapkan biaya pencucian, lalu bagian berikutnya memilih jumlah uang jaminan berdasarkan biaya itu.",
        },
        {
          correct: false,
          label:
            "Bagian awal menyatakan sistem gagal total, lalu bagian berikutnya menghentikan pengembalian uang bagi pengunjung.",
        },
        {
          correct: false,
          label:
            "Bagian awal memindahkan loket, lalu bagian berikutnya membandingkan hasil dengan data dari festival tahun sebelumnya.",
        },
        {
          correct: false,
          label:
            "Bagian awal membuktikan keberhasilan penuh, lalu bagian berikutnya hanya menjelaskan penerapan tetap tanpa evaluasi lagi.",
        },
      ],
    },
  },
};

export default item;
