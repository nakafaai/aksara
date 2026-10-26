import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tari beralih dari satu permainan untuk semua peserta menuju permainan terpisah bagi setiap kebutuhan agar tidak ada aturan bersama.",
        },
        {
          correct: false,
          label:
            "Tari menyimpulkan bahwa aturan yang sama selalu tidak adil dan semua keputusan harus diserahkan kepada peserta.",
        },
        {
          correct: false,
          label:
            "Tari menganggap permainan telah sepenuhnya inklusif setelah peluit dan jalur rumput diganti.",
        },
        {
          correct: false,
          label:
            "Tari berubah terutama karena ketiga anak menunjukkan masalah, bukan karena ia menguji kembali asumsi dan tindakannya.",
        },
        {
          correct: true,
          label:
            "Tari beralih dari menyamakan keadilan dengan aturan seragam menuju keputusan yang diperiksa bersama peserta dan tetap terbuka terhadap hambatan baru.",
        },
      ],
    },
  },
};

export default item;
