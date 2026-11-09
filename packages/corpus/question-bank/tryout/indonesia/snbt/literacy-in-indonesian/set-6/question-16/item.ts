import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "fine-dust",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kendaraan di jalan raya paling banyak melintas di sekitar taman itu pada pukul 20.00.",
        },
        {
          correct: false,
          label:
            "Alat pemantau di Stasiun B menjadi kurang akurat setiap kali matahari terbenam.",
        },
        {
          correct: false,
          label: "Pohon-pohon di taman melepaskan debu halus setelah gelap.",
        },
        {
          correct: false,
          label: "Angin malam membawa partikel dari laut menuju permukiman.",
        },
        {
          correct: true,
          label:
            "Warga memasak dan membakar sampah, lalu udara malam yang tenang menahan partikel.",
        },
      ],
    },
  },
};

export default item;
