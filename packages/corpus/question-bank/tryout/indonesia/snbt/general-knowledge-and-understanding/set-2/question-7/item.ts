import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "antibiotik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bakteri usus seseorang yang meminum antibiotik tanpa resep akan berubah menjadi resistan.",
        },
        {
          correct: false,
          label:
            "Antibiotik yang hanya mengenai sedikit jenis bakteri membuat bakteri usus luput dari seleksi.",
        },
        {
          correct: true,
          label:
            "Pasien yang meminum antibiotik sesuai resep untuk infeksi saluran kemih ikut menyeleksi bakteri di ususnya.",
        },
        {
          correct: false,
          label:
            "Gen resistansi dari bakteri usus hanya dapat diturunkan kepada generasi bakteri usus berikutnya.",
        },
        {
          correct: false,
          label:
            "Setiap pemakaian antibiotik yang tidak perlu menimbulkan seleksi yang lebih kuat daripada pemakaian yang sesuai resep.",
        },
      ],
    },
  },
};

export default item;
