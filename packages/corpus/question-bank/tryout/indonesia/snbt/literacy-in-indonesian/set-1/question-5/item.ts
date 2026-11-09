import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pengelolaan sampah yang tidak baik di Indonesia",
        },
        {
          correct: false,
          label: "Indonesia penyumbang sampah utama dunia",
        },
        {
          correct: true,
          label: "Kesadaran akan sampah yang ia hasilkan sendiri",
        },
        {
          correct: false,
          label:
            "Berita buruk Indonesia sebagai penyumbang sampah ke laut Afrika",
        },
        {
          correct: false,
          label: "Isu lingkungan yang tidak pernah selesai",
        },
      ],
    },
  },
};

export default item;
