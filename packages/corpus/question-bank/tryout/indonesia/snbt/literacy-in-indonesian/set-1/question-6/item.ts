import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dugaan berdasarkan jumlah penduduk Indonesia semata",
        },
        {
          isCorrect: true,
          label:
            "Hasil simulasi dalam studi ilmiah yang memperhitungkan arus, ombak, angin, dan sifat sampah",
        },
        {
          isCorrect: false,
          label:
            "Jarak Indonesia yang paling dekat dengan seluruh pantai Seychelles",
        },
        {
          isCorrect: false,
          label: "Pernyataan seorang peneliti tanpa data pemodelan",
        },
        {
          isCorrect: false,
          label: "Penilaian umum terhadap kebijakan sampah Indonesia",
        },
      ],
    },
  },
};

export default item;
