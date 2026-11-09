import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "library-loans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Siswa berhenti meminjam buku pelajaran pada semester genap.",
        },
        {
          correct: false,
          label: "Buku biografi paling banyak dipinjam pada semester genap.",
        },
        {
          correct: false,
          label: "Peminjaman semua jenis buku naik pada semester genap.",
        },
        {
          correct: true,
          label:
            "Penambahan koleksi komik pengetahuan dan novel remaja diikuti naiknya peminjaman kedua jenis buku itu, sedangkan peminjaman buku pelajaran hampir tidak berubah.",
        },
        {
          correct: false,
          label: "Diskusi buku membuat peminjaman komik pengetahuan naik.",
        },
      ],
    },
  },
};

export default item;
