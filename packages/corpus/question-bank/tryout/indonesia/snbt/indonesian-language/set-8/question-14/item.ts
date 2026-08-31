import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penyebutan *keterbandingan* membuktikan bahwa setiap hasil konversi pada formulir baru sudah benar.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *keterbandingan* pada kesamaan satuan sehingga titik acuan dan waktu dapat diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *keterbandingan* membuat nilai asli tidak perlu disimpan setelah semua angka diubah ke meter.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menjelaskan mengapa uji dilakukan pada 30 pasangan, bukan cara menilai catatan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *keterbandingan* menjelaskan mengapa satuan dan titik acuan perlu diselaraskan, tetapi konteks waktu juga harus cukup setara sebelum dua kedalaman dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
