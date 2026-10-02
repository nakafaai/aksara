import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pada bus tanpa relawan dengan pengarahan pengemudi yang sama, pesan norma terbaru tetap menurunkan hitungan percakapan keras.",
        },
        {
          isCorrect: false,
          label:
            "Poster tambahan di dekat pintu keluar meningkatkan ingatan terhadap pesan, sedangkan kriteria pengamatan percakapan keras tetap sama.",
        },
        {
          isCorrect: true,
          label:
            "Rekaman lengkap dari uji pertama menunjukkan percakapan keras tidak berubah. Keluhan turun hanya karena saluran pelaporan tidak berfungsi pada bus berposter baru.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
        {
          isCorrect: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
