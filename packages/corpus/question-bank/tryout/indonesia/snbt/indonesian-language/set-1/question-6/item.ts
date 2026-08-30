import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dugaan berdasarkan jumlah penduduk Indonesia semata",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jarak Indonesia yang paling dekat dengan seluruh pantai Seychelles",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pernyataan seorang peneliti tanpa data pemodelan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penilaian umum terhadap kebijakan sampah Indonesia",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Hasil simulasi dalam studi ilmiah yang memperhitungkan arus, ombak, angin, dan sifat sampah",
            },
          ],
        },
      ],
    },
  },
};

export default item;
