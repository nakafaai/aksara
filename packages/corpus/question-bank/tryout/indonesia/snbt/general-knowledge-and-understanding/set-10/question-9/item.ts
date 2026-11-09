import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "jamu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "membantah pembagian kelompok yang dibuat oleh BPOM",
        },
        {
          correct: false,
          label: "menjelaskan asal bahan baku jamu dari alam sekitar",
        },
        {
          correct: false,
          label: "memberikan contoh produk dari kelompok fitofarmaka",
        },
        {
          correct: true,
          label: "menyimpulkan pola dari ketiga kelompok sebelumnya",
        },
        {
          correct: false,
          label: "menyebutkan syarat tambahan untuk kelompok jamu",
        },
      ],
    },
  },
};

export default item;
