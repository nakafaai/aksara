import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penyebutan *logistik* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *logistik* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          correct: true,
          label:
            "Definisi *logistik* menunjukkan bahwa ketepatan label hanya satu bagian dari perpindahan buku dari asal sampai penerima, sehingga keterlambatan akibat cuaca tetap relevan.",
        },
        {
          correct: false,
          label:
            "Istilah *logistik* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut menjelaskan keterbatasan masa uji, bukan kriteria yang dipakai untuk membaca rancangan.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
