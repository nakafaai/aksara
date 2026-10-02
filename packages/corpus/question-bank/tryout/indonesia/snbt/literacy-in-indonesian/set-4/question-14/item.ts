import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penyebutan *pemangku kepentingan* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *pemangku kepentingan* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *pemangku kepentingan* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *pemangku kepentingan* menjelaskan alasan orang tua, pedagang, pengelola pasar, dan petugas kebersihan dilibatkan ketika data penunjuk arah dibahas.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut menjelaskan keterbatasan masa uji, bukan kriteria yang dipakai untuk membaca rancangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
