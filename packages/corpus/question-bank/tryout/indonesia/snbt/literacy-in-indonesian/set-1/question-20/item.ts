import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Merekrutnya langsung sebagai pemeran utama film",
        },
        {
          correct: false,
          label: "Menjadi wali yang membiayai hidupnya",
        },
        {
          correct: false,
          label: "Mengatur pernikahannya dengan James Dougherty",
        },
        {
          correct: true,
          label:
            "Memotretnya di pabrik dan menyarankan agar ia mencoba menjadi model",
        },
        {
          correct: false,
          label: "Mengajarinya berakting di Actors Studio",
        },
      ],
    },
  },
};

export default item;
