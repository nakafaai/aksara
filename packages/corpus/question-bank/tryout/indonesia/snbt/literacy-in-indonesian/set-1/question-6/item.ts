import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dugaan berdasarkan jumlah penduduk Indonesia semata",
        },
        {
          correct: true,
          label:
            "Hasil simulasi dalam studi ilmiah yang memperhitungkan arus, ombak, angin, dan sifat sampah",
        },
        {
          correct: false,
          label:
            "Jarak Indonesia yang paling dekat dengan seluruh pantai Seychelles",
        },
        {
          correct: false,
          label: "Pernyataan seorang peneliti tanpa data pemodelan",
        },
        {
          correct: false,
          label: "Penilaian umum terhadap kebijakan sampah Indonesia",
        },
      ],
    },
  },
};

export default item;
