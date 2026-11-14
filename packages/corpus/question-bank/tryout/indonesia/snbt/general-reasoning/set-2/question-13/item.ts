import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "logical-equivalence",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jika Rendi tidak membayar denda dan kartu anggotanya tidak dibekukan, maka Rendi tidak terlambat mengembalikan buku dan buku itu bukan koleksi referensi.",
        },
        {
          correct: true,
          label:
            "Jika Rendi terlambat mengembalikan buku dan tidak membayar denda, maka buku itu bukan koleksi referensi atau kartu anggotanya dibekukan.",
        },
        {
          correct: false,
          label:
            "Jika Rendi terlambat mengembalikan buku, buku itu koleksi referensi, dan Rendi membayar denda, maka kartu anggotanya dibekukan.",
        },
        {
          correct: false,
          label:
            "Jika Rendi terlambat mengembalikan buku dan tidak membayar denda, maka buku itu koleksi referensi atau kartu anggotanya dibekukan.",
        },
        {
          correct: false,
          label:
            "Jika Rendi tidak terlambat mengembalikan buku atau buku itu bukan koleksi referensi, maka Rendi tidak membayar denda dan kartu anggotanya tidak dibekukan.",
        },
      ],
    },
  },
};

export default item;
