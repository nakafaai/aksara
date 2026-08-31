import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penyebutan *data dasar* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *data dasar* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *data dasar* menjelaskan alasan nilai 24 dipakai sebagai titik acuan ketika hasil uji 35 dan hasil pembanding 26 ditafsirkan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *data dasar* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
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
