import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penyebutan *dukungan sebaya* membuktikan rancangan sudah adil tanpa perlu memeriksa data pembanding atau masukan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *dukungan sebaya* pada kebutuhan kelompok terbanyak sehingga variasi kebutuhan lain dapat diabaikan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *dukungan sebaya* menempatkan kartu sebagai alat percakapan antarpeserta yang setara, sehingga kartu tidak boleh mengubah satu peserta menjadi pengawas tetap bagi yang lain.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *dukungan sebaya* menggantikan konsultasi pihak terdampak dengan satu label yang langsung menentukan keputusan.",
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
