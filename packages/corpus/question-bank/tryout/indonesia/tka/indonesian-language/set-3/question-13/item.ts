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
          label:
            "agar suhu dicatat tetapi tidak dimasukkan dalam penafsiran perubahan jumlah botol",
        },
        {
          isCorrect: false,
          label: "agar penjualan kantin meningkat",
        },
        {
          isCorrect: false,
          label:
            "agar peserta survei dan pengguna stasiun dapat dianggap sebagai kelompok yang sama",
        },
        {
          isCorrect: true,
          label:
            "agar jadwal pengangkutan sampah tidak menjadi sumber perbedaan",
        },
        {
          isCorrect: false,
          label:
            "agar perubahan jumlah botol dapat dibandingkan tanpa mengukur volume isi ulang",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
