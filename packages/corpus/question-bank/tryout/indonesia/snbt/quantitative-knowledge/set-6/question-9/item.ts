import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Keliling belah ketupat itu $$52\\text{ cm}$$." },
        { column: 2, label: "Luas belah ketupat itu $$240\\text{ cm}^2$$." },
        {
          column: 2,
          label:
            "Jari-jari lingkaran dalam belah ketupat itu $$\\tfrac{120}{13}\\text{ cm}$$.",
        },
        {
          column: 1,
          label:
            "Jarak antara dua sisi yang sejajar adalah $$\\tfrac{120}{13}\\text{ cm}$$.",
        },
      ],
    },
  },
};

export default item;
