import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Membagi peserta ke dalam dua urutan kondisi.",
        },
        {
          isCorrect: true,
          label: "Menguji kesetaraan paket pada kelompok lain.",
        },
        {
          isCorrect: false,
          label: "Menghapus pencatatan jawaban bagian akhir.",
        },
        {
          isCorrect: false,
          label: "Memastikan semua peserta selalu mulai tanpa jeda.",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;
