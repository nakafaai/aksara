import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Beras dapat dijadikan banyak hidangan ikonik dari seluruh dunia",
        },
        {
          isCorrect: false,
          label: "Beras merupakan bahan pangan pokok bagi masyarakat Indonesia",
        },
        {
          isCorrect: false,
          label: "Pasokan beras di Indonesia sedang menipis",
        },
        {
          isCorrect: false,
          label:
            "Beras menjadi makanan pokok bagi miliaran orang di Asia dan Afrika",
        },
        {
          isCorrect: false,
          label: "Pengolahan beras mengundang pertanyaan di setiap dapur",
        },
      ],
    },
  },
};

export default item;
