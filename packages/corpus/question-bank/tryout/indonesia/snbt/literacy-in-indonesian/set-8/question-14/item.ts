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
            "Penyebutan *keterbandingan* membuktikan bahwa setiap hasil konversi pada formulir baru sudah benar.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *keterbandingan* pada kesamaan satuan sehingga titik acuan dan waktu dapat diabaikan.",
        },
        {
          correct: false,
          label:
            "Istilah *keterbandingan* membuat nilai asli tidak perlu disimpan setelah semua angka diubah ke meter.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menjelaskan mengapa uji dilakukan pada $$30$$ pasangan, bukan cara menilai catatan.",
        },
        {
          correct: true,
          label:
            "Definisi *keterbandingan* menjelaskan mengapa satuan dan titik acuan perlu diselaraskan, tetapi konteks waktu juga harus cukup setara sebelum dua kedalaman dibandingkan.",
        },
      ],
    },
  },
};

export default item;
