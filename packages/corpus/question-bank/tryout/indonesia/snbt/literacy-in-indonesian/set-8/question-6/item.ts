import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pak Darto ingin memastikan bahwa koran Pagi Raya masih tersedia sampai hari terakhir terbitnya.",
        },
        {
          correct: false,
          label:
            "Pak Harun memberi tahu Pak Darto bahwa ia akan membawa lebih banyak koran karena penjualan mulai membaik.",
        },
        {
          correct: true,
          label:
            "Keduanya saling meneguhkan pertemuan harian itu, karena yang dicari Pak Darto adalah kebersamaan, bukan beritanya.",
        },
        {
          correct: false,
          label:
            "Pak Darto mengingatkan Pak Harun agar tidak lupa membawa koran, karena ia sering kehabisan.",
        },
        {
          correct: false,
          label:
            "Pak Harun dan Pak Darto bersepakat untuk berhenti bertemu setelah koran Pagi Raya tidak lagi terbit.",
        },
      ],
    },
  },
};

export default item;
