import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "marathon-water",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pos yang dilewati pelari paling banyak juga merupakan pos yang memerlukan dus gelas paling banyak.",
        },
        {
          column: 1,
          label:
            "Jika ternyata $$1{.}290$$ pelari melewati pos 3 dan setiap pelari mengambil $$2$$ gelas, gelas dalam dus yang diterima pos 3 masih cukup.",
        },
        {
          column: 1,
          label:
            "Jika setiap pos menerima semua galon yang diperlukannya, tepat separuh dari seluruh galon untuk kelima pos dipakai di pos 3 dan pos 4.",
        },
        {
          column: 2,
          label:
            "Jika ternyata $$1{.}310$$ pelari melewati pos 2 dan setiap pelari mengambil $$1$$ gelas, gelas dalam dus yang diterima pos 2 masih cukup.",
        },
      ],
    },
  },
};

export default item;
