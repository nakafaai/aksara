import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
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
          label:
            "Memastikan setiap peserta memulai dari kondisi tanpa jeda sebelum kondisi lain.",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;
