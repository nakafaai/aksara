import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penyebutan *desain inklusif* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *desain inklusif* memberi kriteria untuk menilai apakah rancangan dan bukti akses benar-benar mencakup kebutuhan pengguna yang berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *desain inklusif* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *desain inklusif* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
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
