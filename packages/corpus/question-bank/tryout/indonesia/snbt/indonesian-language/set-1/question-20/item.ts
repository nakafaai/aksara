import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Merekrutnya langsung sebagai pemeran utama film",
        },
        {
          isCorrect: false,
          label: "Menjadi wali yang membiayai hidupnya",
        },
        {
          isCorrect: false,
          label: "Mengatur pernikahannya dengan James Dougherty",
        },
        {
          isCorrect: false,
          label: "Mengajarinya berakting di Actors Studio",
        },
        {
          isCorrect: true,
          label:
            "Memotretnya di pabrik dan menyarankan agar ia mencoba menjadi model",
        },
      ],
    },
  },
};

export default item;
