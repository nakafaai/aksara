import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "pollinators",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Petani di kebun itu menolak membiarkan daun gugur membusuk di bawah pohon.",
        },
        {
          correct: false,
          label:
            "Agas hanya dapat diamati di laboratorium, bukan di kebun milik petani.",
        },
        {
          correct: false,
          label:
            "Jumlah buah kakao di kebun-kebun itu justru turun setelah serasah dibiarkan.",
        },
        {
          correct: true,
          label:
            "Kenaikan jumlah buah belum dapat dipastikan disebabkan oleh tumpukan serasah.",
        },
        {
          correct: false,
          label:
            "Tumpukan kulit buah mungkin terlalu mahal untuk dipakai oleh semua petani.",
        },
      ],
    },
  },
};

export default item;
