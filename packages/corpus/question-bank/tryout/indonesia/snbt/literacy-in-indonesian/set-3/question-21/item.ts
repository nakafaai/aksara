import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar muatan jalur itu pada tahun-tahun pertama adalah penumpang biasa dan barang mereka, karena itu membuktikan bahwa jalur itu dibangun oleh pemerintah, bukan oleh perusahaan swasta.",
        },
        {
          correct: false,
          label:
            "Kota-kota di sepanjang rel tumbuh lebih cepat daripada kota lain, karena itu menunjukkan bahwa arah rel tidak mencerminkan siapa yang paling banyak memakainya.",
        },
        {
          correct: false,
          label:
            "Gula dan kopi dari pedalaman dijual mahal di pasar Eropa, karena itu menunjukkan bahwa pemilik perkebunan sebenarnya merugi.",
        },
        {
          correct: false,
          label:
            "Jalur pertama dibangun oleh perusahaan swasta, karena itu menunjukkan bahwa pemerintah kolonial tidak ikut diuntungkan.",
        },
        {
          correct: true,
          label:
            "Sebagian besar muatan jalur itu pada tahun-tahun pertama adalah penumpang biasa dan barang mereka, karena itu menunjukkan bahwa arah rel tidak mencerminkan siapa yang paling banyak memakainya.",
        },
      ],
    },
  },
};

export default item;
