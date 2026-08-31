import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "setiap benda sebaiknya dibongkar agar sumber kerusakan dapat dipastikan",
        },
        {
          isCorrect: false,
          label:
            "rujukan sekolah menentukan meja pemeriksaan tanpa memerlukan inspeksi awal",
        },
        {
          isCorrect: true,
          label: "pemeriksaan awal menentukan apakah benda aman ditangani",
        },
        {
          isCorrect: false,
          label:
            "baterai menggembung tetap dapat diuji di meja awal selama tidak dibongkar",
        },
        {
          isCorrect: false,
          label:
            "gejala dari pemilik cukup dicatat setelah pengujian benda selesai",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
