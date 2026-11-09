import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "youth-pledge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kongres Pemuda II diadakan di Batavia oleh perkumpulan pemuda dari berbagai daerah.",
        },
        {
          correct: false,
          label:
            "bahasa Jawa ditolak sebagai bahasa persatuan karena penuturnya terlalu banyak.",
        },
        {
          correct: false,
          label:
            "Mohammad Yamin dan Mohammad Tabrani berselisih tentang pemilihan tempat kongres.",
        },
        {
          correct: true,
          label:
            "pilihan kata dan nama dalam ikrar 1928 menjadikan bahasa Indonesia milik bersama.",
        },
        {
          correct: false,
          label:
            "Undang-Undang Dasar 1945 lahir dari perdebatan para pemuda pada tahun 1926.",
        },
      ],
    },
  },
};

export default item;
