import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "library-loans",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Peminjaman buku pelajaran turun dari semester ganjil ke semester genap.",
        },
        {
          column: 2,
          label: "Pada semester genap, novel remaja paling banyak dipinjam.",
        },
        {
          column: 1,
          label:
            "Peminjaman komik pengetahuan pada semester genap lebih dari tiga kali peminjaman pada semester ganjil.",
        },
        {
          column: 2,
          label:
            "Peminjaman buku biografi naik lebih banyak daripada peminjaman novel remaja.",
        },
      ],
    },
  },
};

export default item;
