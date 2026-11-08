import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "leuit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tiang yang menopang lantai bangunan agar tidak roboh.",
        },
        {
          correct: true,
          label: "Cadangan yang meredam akibat kekurangan pangan.",
        },
        {
          correct: false,
          label: "Alat yang menahan getaran pada bangunan panggung.",
        },
        {
          correct: false,
          label: "Pihak yang menengahi perselisihan antarwarga.",
        },
        {
          correct: false,
          label: "Dinding yang memisahkan ruang penyimpanan padi.",
        },
      ],
    },
  },
};

export default item;
