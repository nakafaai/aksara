import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simulasi membuktikan bahwa populasi nyata dengan sumber daya lebih banyak selalu bertambah sampai mencapai jumlah 24 individu.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan hasil simulasi A dan B menunjukkan bahwa keping warna dapat menggantikan pengamatan populasi di lapangan.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi menunjukkan bagaimana dua batas sumber daya menghasilkan dua titik henti populasi, tetapi titik 16 dan 24 berasal dari aturan model dan bukan temuan lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Karena model tidak memuat penyakit dan migrasi, hubungan antara sumber daya dan batas populasi tidak dapat dipelajari melalui simulasi.",
        },
        {
          isCorrect: false,
          label:
            "Definisi daya dukung memastikan bahwa setiap lingkungan memiliki batas populasi tetap yang dapat dihitung dari satu simulasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
