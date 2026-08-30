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
          label: "nama lain untuk benda koleksi",
        },
        {
          isCorrect: false,
          label: "hasil yang selalu tetap",
        },
        {
          isCorrect: true,
          label: "unsur yang sengaja dibedakan atau diamati dalam pengujian",
        },
        {
          isCorrect: false,
          label: "daftar semua pengunjung museum",
        },
        {
          isCorrect: false,
          label: "perangkat yang harus dibuang",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
