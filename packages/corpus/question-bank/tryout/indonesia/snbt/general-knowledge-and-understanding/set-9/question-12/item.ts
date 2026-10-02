import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Penurunan keluhan awal belum cukup membuktikan mekanisme pesan karena perlakuan lain juga berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
        {
          isCorrect: false,
          label:
            "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
