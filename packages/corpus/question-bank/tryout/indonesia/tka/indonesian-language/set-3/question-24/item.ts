import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "bedakan antara tidak terlihat dan terbukti gagal",
        },
        {
          isCorrect: false,
          label: "ubah data yang tidak lengkap menjadi angka pasti",
        },
        {
          isCorrect: false,
          label: "abaikan semua catatan lokasi",
        },
        {
          isCorrect: false,
          label: "gunakan satu ukuran untuk semua kondisi",
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
