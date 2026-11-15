import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jalur Semarang ke Tanggung memang merupakan awal modernisasi Jawa.",
        },
        {
          correct: false,
          label:
            "Jalur pertama itu dirancang terutama untuk memudahkan perjalanan penduduk.",
        },
        {
          correct: true,
          label:
            "Manfaat rel bagi pedagang kecil dan buruh nyata, walaupun bukan tujuan utama pembangunannya.",
        },
        {
          correct: false,
          label:
            "Lebar rel jalur pertama menjadi standar yang dipakai di sebagian besar Jawa.",
        },
        {
          correct: true,
          label:
            "Keuntungan terbesar dari jalur pertama jatuh ke pemilik perkebunan dan perusahaan dagang.",
        },
      ],
    },
  },
};

export default item;
