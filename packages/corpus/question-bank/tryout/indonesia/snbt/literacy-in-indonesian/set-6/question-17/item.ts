import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "fine-dust",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Angka di Stasiun B pada beberapa jam lebih tinggi daripada di Stasiun A.",
        },
        {
          correct: true,
          label: "Datanya hanya tujuh pengukuran pada satu hari kerja.",
        },
        {
          correct: false,
          label:
            "Pedoman WHO hanya berlaku untuk rata-rata selama 24 jam penuh.",
        },
        {
          correct: false,
          label:
            "Angka tertinggi kedua stasiun tercatat pada jam yang berbeda.",
        },
        {
          correct: false,
          label: "Stasiun B dipasang sekitar dua kilometer dari jalan raya.",
        },
      ],
    },
  },
};

export default item;
