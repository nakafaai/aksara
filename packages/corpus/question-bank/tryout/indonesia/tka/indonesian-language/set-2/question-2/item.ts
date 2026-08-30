import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "memperkirakan sumber kerusakan berdasarkan pemeriksaan",
        },
        {
          isCorrect: false,
          label: "menjual benda rusak dengan harga rendah",
        },
        {
          isCorrect: false,
          label: "membongkar semua alat tanpa aturan",
        },
        {
          isCorrect: false,
          label: "mengganti setiap komponen lama",
        },
        {
          isCorrect: false,
          label: "menjamin benda akan kembali seperti baru",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
