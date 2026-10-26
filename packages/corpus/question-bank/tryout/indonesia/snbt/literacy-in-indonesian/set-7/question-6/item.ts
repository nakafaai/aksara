import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simulasi membuktikan bahwa populasi nyata dengan sumber daya lebih banyak selalu bertambah sampai mencapai jumlah $$24$$ individu.",
        },
        {
          correct: false,
          label:
            "Perbedaan hasil simulasi A dan B menunjukkan bahwa keping warna dapat menggantikan pengamatan populasi di lapangan.",
        },
        {
          correct: true,
          label:
            "Simulasi menunjukkan bagaimana dua batas sumber daya menghasilkan dua titik henti populasi, tetapi titik $$16$$ dan $$24$$ berasal dari aturan model dan bukan temuan lapangan.",
        },
        {
          correct: false,
          label:
            "Karena model tidak memuat penyakit dan migrasi, hubungan antara sumber daya dan batas populasi tidak dapat dipelajari melalui simulasi.",
        },
        {
          correct: false,
          label:
            "Definisi daya dukung memastikan bahwa setiap lingkungan memiliki batas populasi tetap yang dapat dihitung dari satu simulasi.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
