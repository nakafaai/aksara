import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "beber",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Es di permukaan kolam itu mulai *mencair* ketika matahari meninggi.",
        },
        {
          correct: true,
          label:
            "Penari itu baru *bergerak* setelah kendang ditabuh untuk ketiga kalinya.",
        },
        {
          correct: false,
          label:
            "Warga segera *bergerak* membersihkan saluran air setelah banjir surut.",
        },
        {
          correct: false,
          label:
            "Sikap kepala desa itu *melunak* setelah warga menjelaskan duduk perkaranya.",
        },
        {
          correct: false,
          label:
            "Dana nasabah yang sempat dibekukan bank akhirnya *dicairkan* bulan ini.",
        },
      ],
    },
  },
};

export default item;
