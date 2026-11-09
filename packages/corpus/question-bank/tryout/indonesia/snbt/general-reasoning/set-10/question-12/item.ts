import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "modus-tollens",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Perpustakaan sekolah tutup pada sore itu.",
        },
        {
          correct: false,
          label: "Rina meminjam buku di perpustakaan lain.",
        },
        {
          correct: false,
          label: "Rina membawa kartu anggota, tetapi lupa judul bukunya.",
        },
        {
          correct: true,
          label: "Rina tidak membawa kartu anggota perpustakaan.",
        },
        {
          correct: false,
          label: "Rina tidak ingin membaca buku pada sore itu.",
        },
      ],
    },
  },
};

export default item;
