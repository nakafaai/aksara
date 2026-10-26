import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penyebutan *data dasar* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *data dasar* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          correct: true,
          label:
            "Definisi *data dasar* menjelaskan alasan nilai $$24$$ dipakai sebagai titik acuan ketika hasil uji $$35$$ dan hasil pembanding $$26$$ ditafsirkan.",
        },
        {
          correct: false,
          label:
            "Istilah *data dasar* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
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
