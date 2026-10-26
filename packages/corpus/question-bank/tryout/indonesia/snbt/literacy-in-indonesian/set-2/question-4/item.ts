import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Beras dapat dijadikan banyak hidangan ikonik dari seluruh dunia",
        },
        {
          correct: false,
          label: "Beras merupakan bahan pangan pokok bagi masyarakat Indonesia",
        },
        {
          correct: false,
          label: "Pasokan beras di Indonesia sedang menipis",
        },
        {
          correct: false,
          label:
            "Beras menjadi makanan pokok bagi miliaran orang di Asia dan Afrika",
        },
        {
          correct: false,
          label: "Pengolahan beras mengundang pertanyaan di setiap dapur",
        },
      ],
    },
  },
};

export default item;
