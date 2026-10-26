import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nilai $$29$$ dibandingkan $$19$$ membuktikan bahwa penunjuk arah akan sama efektifnya pada pasar malam yang lebih ramai.",
        },
        {
          correct: true,
          label:
            "Rata-rata $$29$$ pengunjung pada uji dibandingkan $$19$$ pada kondisi pembanding mendukung penerusan penunjuk arah secara terbatas, tetapi ketiadaan pengamatan pada pasar malam membatasi penerapannya pada kondisi ramai.",
        },
        {
          correct: false,
          label:
            "Nilai dasar $$18$$ menunjukkan bahwa sebagian besar pengunjung sudah menemukan ruang, sehingga penunjuk arah tidak perlu diuji lagi.",
        },
        {
          correct: false,
          label:
            "Keterlibatan orang tua, pedagang, dan petugas cukup menjamin bahwa hasil berlaku untuk semua keadaan pasar.",
        },
        {
          correct: false,
          label:
            "Karena jadwal dan jumlah petugas tidak berubah, penunjuk arah pasti menjadi satu-satunya penyebab kenaikan pada setiap pasar.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
