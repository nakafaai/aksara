import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "bystander-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Seseorang tergeletak di peron stasiun yang ramai, dan orang-orang di sekitarnya ragu apakah ia sakit atau hanya tidur.",
        },
        {
          correct: false,
          label:
            "Asap tebal tiba-tiba keluar dari lantai bawah sebuah pusat perbelanjaan yang sedang ramai pengunjung pada akhir pekan.",
        },
        {
          correct: false,
          label:
            "Seorang pejalan kaki sendirian di jalan sepi melihat seorang anak terjatuh dari sepeda, lututnya berdarah, lalu menangis.",
        },
        {
          correct: true,
          label:
            "Di halte bus yang penuh, seorang lelaki duduk lemas sambil memegangi dada, dan orang-orang mengira ia hanya kelelahan.",
        },
        {
          correct: false,
          label:
            "Seseorang terjatuh ke kolam yang dalam dan berteriak minta tolong, sementara satu penjaga kolam melihatnya dari kursinya.",
        },
      ],
    },
  },
};

export default item;
