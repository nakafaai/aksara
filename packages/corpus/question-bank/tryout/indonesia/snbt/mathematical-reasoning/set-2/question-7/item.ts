import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "street-lamp",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Panjang bayangan anak selalu setengah jarak anak ke kaki tiang.",
        },
        {
          column: 1,
          label:
            "Setelah berjalan selama 10 detik, ujung bayangan anak berjarak 18 m dari kaki tiang.",
        },
        {
          column: 2,
          label:
            "Panjang bayangan anak bertambah $$1{,}2\\text{ m}$$ setiap detik.",
        },
        {
          column: 2,
          label:
            "Jika tinggi anak itu 2 m, panjang bayangannya pada saat ia berada 7 m dari kaki tiang adalah $$3{,}5\\text{ m}$$.",
        },
      ],
    },
  },
};

export default item;
