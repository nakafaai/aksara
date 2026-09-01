import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "gunakan perkiraan numerik agar lokasi yang datanya hilang tetap dapat dibandingkan",
        },
        {
          isCorrect: true,
          label: "bedakan antara tidak terlihat dan terbukti gagal",
        },
        {
          isCorrect: false,
          label:
            "utamakan jumlah bibit yang ditemukan tanpa membedakan kondisi tiap lokasi",
        },
        {
          isCorrect: false,
          label:
            "gunakan indikator pertumbuhan yang sama tanpa mencatat perbedaan arus dan genangan",
        },
        {
          isCorrect: false,
          label: "hentikan pemeriksaan setelah minggu pertama",
        },
      ],
    },
  },
  stimulusKey: "mangrove-nursery",
};

export default item;
