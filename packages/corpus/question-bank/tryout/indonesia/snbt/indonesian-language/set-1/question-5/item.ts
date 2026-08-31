import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pengelolaan sampah yang tidak baik di Indonesia",
        },
        {
          isCorrect: false,
          label: "Indonesia penyumbang sampah utama dunia",
        },
        {
          isCorrect: true,
          label: "Kesadaran akan sampah yang ia hasilkan sendiri",
        },
        {
          isCorrect: false,
          label:
            "Berita buruk Indonesia sebagai penyumbang sampah ke laut Afrika",
        },
        {
          isCorrect: false,
          label: "Isu lingkungan yang tidak pernah selesai",
        },
      ],
    },
  },
};

export default item;
