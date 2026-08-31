import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penyebutan *keterbandingan* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *keterbandingan* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *keterbandingan* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut menjelaskan keterbatasan masa uji, bukan kriteria yang dipakai untuk membaca rancangan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *keterbandingan* memberi kriteria untuk menilai apakah rancangan dan bukti akses benar-benar mencakup kebutuhan pengguna yang berbeda.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
