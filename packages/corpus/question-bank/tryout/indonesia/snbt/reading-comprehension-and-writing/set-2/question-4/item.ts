import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "perahu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Catatan peminjaman memperlihatkan bahwa orang dewasa di hilir dan anak-anak di hulu menyukai jenis buku yang berbeda.",
        },
        {
          correct: false,
          label:
            "Pita berwarna membuat peti buku untuk hilir dan hulu tidak tertukar ketika dinaikkan ke perahu.",
        },
        {
          correct: true,
          label:
            "Relawan menyiasati muatan perahu yang terbatas dengan menyesuaikan isi peti dengan minat pembaca di tiap wilayah sehingga makin sedikit buku yang terbawa tanpa dipinjam.",
        },
        {
          correct: false,
          label:
            "Bagian muatan yang tidak pernah dipinjam selama sebulan turun dari sekitar sepertiga menjadi kurang dari sepersepuluh.",
        },
        {
          correct: false,
          label:
            "Muatan perahu yang terbatas membuat relawan hanya membawa buku yang paling disukai anak-anak.",
        },
      ],
    },
  },
};

export default item;
