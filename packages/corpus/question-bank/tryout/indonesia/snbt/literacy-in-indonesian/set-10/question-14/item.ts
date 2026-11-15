import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "ai-homework",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Alat pendeteksi tulisan mesin menandai esai $$18$$ siswa itu sebagai tulisan mesin.",
        },
        {
          correct: true,
          label:
            "Sebagian besar dari $$18$$ siswa itu juga tidak dapat menjelaskan esai yang mereka tulis sendiri di kelas di depan guru.",
        },
        {
          correct: false,
          label:
            "Sebanyak $$14$$ siswa yang dapat menjelaskan esainya menulis dengan bahasa yang lebih sederhana.",
        },
        {
          correct: false,
          label:
            "Aplikasi kecerdasan buatan dapat dipakai dengan mudah oleh semua siswa di rumah.",
        },
        {
          correct: false,
          label:
            "Esai $$18$$ siswa itu memuat istilah yang belum pernah dipelajari di kelas.",
        },
      ],
    },
  },
};

export default item;
