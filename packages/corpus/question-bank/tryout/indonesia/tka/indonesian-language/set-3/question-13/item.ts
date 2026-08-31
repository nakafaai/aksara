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
          isCorrect: false,
          label: "perangkat lunak pada kartu siswa untuk mencatat botol",
        },
        {
          isCorrect: false,
          label: "urutan acara OSIS untuk mengumumkan hasil survei",
        },
        {
          isCorrect: false,
          label: "jadwal pengisian tangki setelah kegiatan olahraga",
        },
        {
          isCorrect: true,
          label:
            "rangkaian kegiatan terencana yang menyediakan botol bagi siswa yang membutuhkan",
        },
        {
          isCorrect: false,
          label: "daftar seluruh siswa yang wajib membawa botol sendiri",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
