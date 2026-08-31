import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai 31 membuktikan bahwa peta kebutuhan akses mencakup seluruh ragam kebutuhan sensorik dan motorik.",
        },
        {
          isCorrect: false,
          label:
            "Selisih antara nilai dasar 19 dan pembanding 20 membuat keterbatasan ragam peserta tidak lagi relevan.",
        },
        {
          isCorrect: false,
          label:
            "Masukan keluarga dan perancang cukup untuk menggantikan keterlibatan langsung semua kelompok pengguna dalam uji.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 31 dibandingkan 20 mendukung penerusan peta secara terbatas, tetapi ragam kebutuhan sensorik dan motorik yang belum terlibat harus diuji sebelum penerapan lebih luas.",
        },
        {
          isCorrect: false,
          label:
            "Peta sebaiknya langsung diterapkan penuh karena perubahan jadwal dan jumlah petugas telah dikendalikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
