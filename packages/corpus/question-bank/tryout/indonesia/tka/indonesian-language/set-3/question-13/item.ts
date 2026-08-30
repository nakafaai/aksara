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
          isCorrect: false,
          label: "agar suhu harian selalu sama",
        },
        {
          isCorrect: false,
          label: "agar penjualan kantin meningkat",
        },
        {
          isCorrect: false,
          label: "agar semua siswa mengikuti survei",
        },
        {
          isCorrect: true,
          label:
            "agar jadwal pengangkutan sampah tidak menjadi sumber perbedaan",
        },
        {
          isCorrect: false,
          label: "agar volume air tidak perlu dicatat",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
