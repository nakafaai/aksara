import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "perangkat lunak pada kartu siswa untuk mencatat botol",
        },
        {
          correct: false,
          label: "urutan acara OSIS untuk mengumumkan hasil survei",
        },
        {
          correct: false,
          label: "jadwal pengisian tangki setelah kegiatan olahraga",
        },
        {
          correct: true,
          label:
            "rangkaian kegiatan terencana yang menyediakan botol bagi siswa yang membutuhkan",
        },
        {
          correct: false,
          label: "daftar seluruh siswa yang wajib membawa botol sendiri",
        },
      ],
    },
  },
  stimulus: "refill-station",
};

export default item;
