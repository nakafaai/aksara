import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai 29 dibandingkan 19 membuktikan bahwa penunjuk arah akan sama efektifnya pada pasar malam yang lebih ramai.",
        },
        {
          isCorrect: true,
          label:
            "Kenaikan menjadi 29 dibandingkan 19 mendukung penerusan penunjuk arah secara terbatas, tetapi ketiadaan pengamatan pada pasar malam membatasi penerapannya pada kondisi ramai.",
        },
        {
          isCorrect: false,
          label:
            "Nilai dasar 18 menunjukkan bahwa sebagian besar pengunjung sudah menemukan ruang, sehingga penunjuk arah tidak perlu diuji lagi.",
        },
        {
          isCorrect: false,
          label:
            "Keterlibatan orang tua, pedagang, dan petugas cukup menjamin bahwa hasil berlaku untuk semua keadaan pasar.",
        },
        {
          isCorrect: false,
          label:
            "Karena jadwal dan jumlah petugas tidak berubah, penunjuk arah pasti menjadi satu-satunya penyebab kenaikan pada setiap pasar.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
