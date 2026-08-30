import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pengelolaan sampah yang tidak baik di Indonesia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Indonesia penyumbang sampah utama dunia" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Berita buruk Indonesia sebagai penyumbang sampah ke laut Afrika",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Isu lingkungan yang tidak pernah selesai" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kesadaran akan sampah yang ia hasilkan sendiri",
            },
          ],
        },
      ],
    },
  },
};

export default item;
