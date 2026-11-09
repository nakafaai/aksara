import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "pagar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pagar tanaman menurunkan kadar PM2,5 di seluruh kota.",
        },
        {
          correct: true,
          label:
            "Pagar tanaman menghalangi sebagian partikel dari jalan mencapai trotoar, terutama ketika udara tidak banyak bergerak.",
        },
        {
          correct: false,
          label:
            "Pada hari berangin kencang, pagar tanaman sama sekali tidak memengaruhi kadar PM2,5 di trotoar karena partikel langsung terbawa angin ke arah lain.",
        },
        {
          correct: false,
          label:
            "Pagar tanaman yang rapat lebih menguntungkan bagi pengendara di lajur kendaraan.",
        },
        {
          correct: false,
          label:
            "Kadar PM2,5 di trotoar tanpa pemisah selalu melampaui batas aman.",
        },
      ],
    },
  },
};

export default item;
