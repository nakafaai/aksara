import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "reading-minutes",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "hanya menghitung jumlah buku yang dipinjam setiap bulan",
        },
        {
          correct: true,
          label:
            "mencatat kebiasaan membaca siswa sebelum dan sesudah program, termasuk buku yang selesai dibaca",
        },
        {
          correct: false,
          label: "mewajibkan siswa meringkas setiap buku yang mereka baca",
        },
        {
          correct: false,
          label: "mengumumkan bahwa program pasti berhasil sejak hari pertama",
        },
        {
          correct: false,
          label: "menghentikan program begitu angka peminjaman naik",
        },
      ],
    },
  },
};

export default item;
