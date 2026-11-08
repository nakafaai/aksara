import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "wall-clock",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tamu yang dulu sering datang berkunjung ke rumah Kakek",
        },
        {
          correct: false,
          label: "jam yang sudah rusak dan tidak bergerak lagi",
        },
        {
          correct: true,
          label: "jam yang terus berjalan seakan masih menunggu Kakek",
        },
        {
          correct: false,
          label: "Ibu yang ingin para tamunya segera pulang",
        },
        {
          correct: false,
          label: "Kakek yang tidak suka menerima tamu di rumahnya",
        },
      ],
    },
  },
};

export default item;
