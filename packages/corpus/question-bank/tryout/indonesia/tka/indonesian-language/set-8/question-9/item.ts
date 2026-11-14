import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "lost-vote",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kirana berkampanye dari kelas ke kelas selama dua minggu.",
        },
        {
          correct: false,
          label: "Kirana memperoleh 287 suara dalam pemilihan.",
        },
        {
          correct: false,
          label: "Kirana ikut bertepuk tangan ketika pemenang diumumkan.",
        },
        {
          correct: true,
          label:
            "Kirana ingat ia menyusun program itu karena benar-benar kesal melihat sampah di bawah meja kantin.",
        },
        {
          correct: false,
          label: "Kirana menggenggam ujung roknya saat menunggu pengumuman.",
        },
      ],
    },
  },
};

export default item;
