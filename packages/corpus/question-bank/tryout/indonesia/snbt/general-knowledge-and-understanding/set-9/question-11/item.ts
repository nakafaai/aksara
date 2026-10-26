import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pada bus tanpa relawan dengan pengarahan pengemudi yang sama, pesan norma terbaru tetap menurunkan hitungan percakapan keras.",
        },
        {
          correct: false,
          label:
            "Poster tambahan di dekat pintu keluar meningkatkan ingatan terhadap pesan, sedangkan kriteria pengamatan percakapan keras tetap sama.",
        },
        {
          correct: true,
          label:
            "Rekaman lengkap dari uji pertama menunjukkan percakapan keras tidak berubah. Keluhan turun hanya karena saluran pelaporan tidak berfungsi pada bus berposter baru.",
        },
        {
          correct: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
        {
          correct: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
