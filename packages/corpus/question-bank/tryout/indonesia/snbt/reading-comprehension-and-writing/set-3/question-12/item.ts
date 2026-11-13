import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "lapak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sekitar dua pertiga dari seluruh pembeli harian pasar pada bulan Juli adalah warga yang sebelumnya membeli ikan dari pedagang keliling.",
        },
        {
          correct: false,
          label:
            "Pedagang keliling kehilangan sekitar dua ratus pembeli harian setelah pasar dibenahi.",
        },
        {
          correct: false,
          label:
            "Sepertiga dari pembeli tambahan pada bulan Juli sebelumnya tidak pernah membeli ikan.",
        },
        {
          correct: true,
          label:
            "Pada bulan Juli, lebih dari seratus pembeli harian pasar adalah warga yang sebelumnya membeli ikan dari pedagang keliling.",
        },
        {
          correct: false,
          label:
            "Kenaikan jumlah pembeli harian terutama disebabkan oleh pedagang keliling yang pindah berjualan ke dalam pasar.",
        },
      ],
    },
  },
};

export default item;
