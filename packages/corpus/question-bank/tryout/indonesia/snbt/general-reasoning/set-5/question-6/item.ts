import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "evaluation",
  },
  stimulus: "bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Berapa harga tiket bus kota di kota-kota lain yang berdekatan?",
        },
        {
          correct: false,
          label:
            "Berapa banyak bus yang dioperasikan di koridor $$3$$ setiap hari?",
        },
        {
          correct: false,
          label:
            "Apakah pengelola berencana menaikkan tarif koridor $$3$$ tahun depan?",
        },
        {
          correct: false,
          label:
            "Berapa lama perjalanan bus koridor $$3$$ dari halte pertama sampai halte terakhir pada pagi hari dan pada siang hari?",
        },
        {
          correct: true,
          label:
            "Apakah pada tahun-tahun sebelumnya penumpang pukul 06.30 sampai 08.00 juga turun dari Februari ke April?",
        },
      ],
    },
  },
};

export default item;
