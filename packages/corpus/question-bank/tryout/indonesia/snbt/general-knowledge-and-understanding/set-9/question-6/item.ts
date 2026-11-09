import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "rabies",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "harga vaksin untuk setiap dosis",
        },
        {
          correct: false,
          label: "jenis vaksin yang dipakai petugas",
        },
        {
          correct: false,
          label: "waktu pemberian vaksin dalam setahun",
        },
        {
          correct: false,
          label: "tempat menyimpan vaksin agar tetap dingin",
        },
        {
          correct: true,
          label: "besarnya bagian yang sudah terjangkau",
        },
      ],
    },
  },
};

export default item;
