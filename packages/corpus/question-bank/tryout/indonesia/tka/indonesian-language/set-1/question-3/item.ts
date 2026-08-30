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
          label: "warga menolak memakai kartu riwayat",
        },
        {
          isCorrect: false,
          label: "semua benih harus ditanam di kebun sekolah",
        },
        {
          isCorrect: true,
          label: "kartu riwayat membantu pemilihan dan pengujian benih",
        },
        {
          isCorrect: false,
          label: "petugas hanya menerima benih yang sudah diuji",
        },
        {
          isCorrect: false,
          label: "rumah berhalaman sempit tidak dapat ikut program",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;
