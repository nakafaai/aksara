import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "pinisi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Perahu nelayan di kampung itu masih dibuat dengan cara yang *kuno*.",
        },
        {
          correct: true,
          label:
            "Galangan di Surabaya membangun kapal baja dengan teknologi *modern*.",
        },
        {
          correct: false,
          label:
            "Peluncuran kapal baru di Tanah Beru selalu diawali upacara *adat*.",
        },
        {
          correct: false,
          label: "Kain tenun itu dipasarkan sebagai produk *lokal* unggulan.",
        },
        {
          correct: false,
          label:
            "Tukang kayu itu memakai alat *sederhana* untuk menghaluskan papan.",
        },
      ],
    },
  },
};

export default item;
