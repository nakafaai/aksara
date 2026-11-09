import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "free-transit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membuktikan bahwa bus gratis selalu gagal menarik penumpang baru di kota mana pun.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa sebagian penumpang baru berasal dari pejalan kaki, bukan pengendara mobil.",
        },
        {
          correct: false,
          label:
            "Menjelaskan cara kota itu membiayai bus gratis tanpa kehilangan pendapatan tiket.",
        },
        {
          correct: false,
          label:
            "Membandingkan jumlah bus gratis di kota Eropa itu dengan jumlah bus di kota-kota Indonesia.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa warga Eropa umumnya lebih suka berjalan kaki daripada naik bus.",
        },
      ],
    },
  },
};

export default item;
