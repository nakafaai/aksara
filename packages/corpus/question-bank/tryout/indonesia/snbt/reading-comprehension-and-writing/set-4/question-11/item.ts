import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "assumption",
  },
  stimulus: "peron",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar peminjam mengembalikan buku di rak stasiun tempat mereka mengambilnya.",
        },
        {
          correct: true,
          label:
            "Buku milik penumpang yang ditaruh di rak tidak menutupi kekurangan akibat buku pinjaman yang tidak kembali.",
        },
        {
          correct: false,
          label:
            "Buku yang dikembalikan umumnya sudah dibaca sampai tamat oleh peminjamnya.",
        },
        {
          correct: false,
          label:
            "Buku yang sedang dipinjam pada Jumat malam sudah kembali ke rak sebelum penghitungan dimulai.",
        },
        {
          correct: false,
          label:
            "Penumpang yang menaruh buku miliknya di rak tidak mengambil buku itu kembali selama enam bulan itu.",
        },
      ],
    },
  },
};

export default item;
