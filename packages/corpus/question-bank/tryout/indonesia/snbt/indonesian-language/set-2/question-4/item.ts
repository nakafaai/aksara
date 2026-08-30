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
              text: "Beras merupakan bahan pangan pokok bagi masyarakat Indonesia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pasokan beras di Indonesia sedang menipis" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beras menjadi makanan pokok bagi miliaran orang di Asia dan Afrika",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Beras dapat dijadikan banyak hidangan ikonik dari seluruh dunia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pengolahan beras mengundang pertanyaan di setiap dapur",
            },
          ],
        },
      ],
    },
  },
};

export default item;
