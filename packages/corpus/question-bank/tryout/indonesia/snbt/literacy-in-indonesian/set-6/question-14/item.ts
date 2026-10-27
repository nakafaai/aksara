import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penyebutan *dukungan sebaya* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *dukungan sebaya* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          correct: true,
          label:
            "Definisi *dukungan sebaya* menjelaskan hubungan yang relatif setara antarpasangan belajar, sehingga kartu tujuan dibahas dan direvisi dengan mempertimbangkan masukan peserta.",
        },
        {
          correct: false,
          label:
            "Istilah *dukungan sebaya* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut menjelaskan keterbatasan masa uji, bukan kriteria yang dipakai untuk membaca rancangan.",
        },
      ],
    },
  },
};

export default item;
