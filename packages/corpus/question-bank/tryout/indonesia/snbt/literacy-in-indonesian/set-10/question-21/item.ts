import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tari beralih dari satu permainan untuk semua peserta menuju permainan terpisah bagi setiap kebutuhan agar tidak ada aturan bersama.",
        },
        {
          isCorrect: false,
          label:
            "Tari menyimpulkan bahwa aturan yang sama selalu tidak adil dan semua keputusan harus diserahkan kepada peserta.",
        },
        {
          isCorrect: false,
          label:
            "Tari menganggap permainan telah sepenuhnya inklusif setelah peluit dan jalur rumput diganti.",
        },
        {
          isCorrect: false,
          label:
            "Tari berubah terutama karena ketiga anak menunjukkan masalah, bukan karena ia menguji kembali asumsi dan tindakannya.",
        },
        {
          isCorrect: true,
          label:
            "Tari beralih dari menyamakan keadilan dengan aturan seragam menuju keputusan yang diperiksa bersama peserta dan tetap terbuka terhadap hambatan baru.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
