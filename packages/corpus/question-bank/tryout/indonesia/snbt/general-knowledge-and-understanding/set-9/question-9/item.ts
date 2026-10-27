import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebagian penurunan keluhan awal mungkin berasal dari kehadiran relawan atau pengarahan pengemudi.",
        },
        {
          correct: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
        {
          correct: false,
          label:
            "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama.",
        },
        {
          correct: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
        {
          correct: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
      ],
    },
  },
};

export default item;
