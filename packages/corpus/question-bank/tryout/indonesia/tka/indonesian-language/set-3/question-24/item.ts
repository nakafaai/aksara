import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "gunakan perkiraan numerik agar lokasi yang datanya hilang tetap dapat dibandingkan",
        },
        {
          correct: true,
          label: "bedakan antara tidak terlihat dan terbukti gagal",
        },
        {
          correct: false,
          label:
            "utamakan jumlah bibit yang ditemukan tanpa membedakan kondisi tiap lokasi",
        },
        {
          correct: false,
          label:
            "gunakan indikator pertumbuhan yang sama tanpa mencatat perbedaan arus dan genangan",
        },
        {
          correct: false,
          label: "hentikan pemeriksaan setelah minggu pertama",
        },
      ],
    },
  },
};

export default item;
