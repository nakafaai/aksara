import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Poster Baru di Panggung Baca Terminal",
        },
        {
          isCorrect: false,
          label: "Sopir yang Menunggu Jadwal Berikutnya",
        },
        {
          isCorrect: true,
          label: "Ketika Lampu Baca Menjadi Undangan",
        },
        {
          isCorrect: false,
          label: "Mengapa Panggung Baca Hanya untuk Anak-Anak",
        },
        {
          isCorrect: false,
          label: "Hujan Sore yang Menghentikan Kegiatan Membaca",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
