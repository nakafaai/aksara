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
          label: "semua benda harus dibongkar oleh siswa",
        },
        {
          isCorrect: false,
          label: "teknisi dilarang menerima rujukan dari sekolah",
        },
        {
          isCorrect: true,
          label: "pemeriksaan awal menentukan apakah benda aman ditangani",
        },
        {
          isCorrect: false,
          label: "baterai menggembung dapat diperbaiki tanpa alat",
        },
        {
          isCorrect: false,
          label: "pemilik tidak perlu menjelaskan gejala",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
