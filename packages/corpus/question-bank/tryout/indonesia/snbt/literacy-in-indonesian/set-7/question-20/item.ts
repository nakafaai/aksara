import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "bus-ridership",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bus yang lebih sering kemungkinan menyumbang sebagian besar kenaikan penumpang di Koridor A dan Koridor B.",
        },
        {
          correct: true,
          label:
            "Jika setiap penumpang membayar tarif penuh, pendapatan tiket per hari kerja turun walaupun banyak penumpang bertambah.",
        },
        {
          correct: false,
          label:
            "Kenaikan penumpang pasti bertahan pada bulan-bulan sesudah November 2024.",
        },
        {
          correct: false,
          label:
            "Penurunan tarif tidak berpengaruh sama sekali terhadap penumpang di Koridor C dan Koridor D.",
        },
        {
          correct: true,
          label:
            "Menurunkan tarif lagi menjadi Rp$$2{.}000$$ dapat menurunkan pendapatan tiket lebih jauh jika penumpang hanya naik sedikit.",
        },
      ],
    },
  },
};

export default item;
