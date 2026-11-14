import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "wallpaper-rolls",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dengan wallpaper polos, kamar Rina memerlukan paling sedikit $$8$$ gulung.",
        },
        {
          column: 2,
          label:
            "Seandainya kamar Rina tidak berpintu dan seluruh dinding ditutup wallpaper polos, gulungan yang diperlukan menjadi $$9$$.",
        },
        {
          column: 2,
          label:
            "Banyak lembar yang dipasang di kamar Rina, termasuk dua lembar pendek, sama dengan keliling kamar dibagi $$50\\text{ cm}$$ lalu dibulatkan ke atas.",
        },
        {
          column: 2,
          label:
            "Seandainya tinggi dinding kamar Rina $$245\\text{ cm}$$, wallpaper polos yang diperlukan tetap $$8$$ gulung.",
        },
      ],
    },
  },
};

export default item;
