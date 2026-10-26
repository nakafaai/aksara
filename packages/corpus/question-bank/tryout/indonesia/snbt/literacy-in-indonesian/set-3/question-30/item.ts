import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Poster Baru di Panggung Baca Terminal",
        },
        {
          correct: false,
          label: "Sopir yang Menunggu Jadwal Berikutnya",
        },
        {
          correct: true,
          label: "Ketika Lampu Baca Menjadi Undangan",
        },
        {
          correct: false,
          label: "Mengapa Panggung Baca Hanya untuk Anak-Anak",
        },
        {
          correct: false,
          label: "Hujan Sore yang Menghentikan Kegiatan Membaca",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
