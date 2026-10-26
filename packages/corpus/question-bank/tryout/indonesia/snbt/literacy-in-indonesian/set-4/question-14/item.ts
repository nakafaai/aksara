import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penyebutan *pemangku kepentingan* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *pemangku kepentingan* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          correct: false,
          label:
            "Istilah *pemangku kepentingan* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
        },
        {
          correct: true,
          label:
            "Definisi *pemangku kepentingan* menjelaskan alasan orang tua, pedagang, pengelola pasar, dan petugas kebersihan dilibatkan ketika data penunjuk arah dibahas.",
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
