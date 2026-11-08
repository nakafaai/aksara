import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "tourist-map",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jarak sebenarnya 10 km digambar sepanjang 4 cm pada peta itu.",
        },
        { column: 2, label: "Setiap 1 cm pada peta itu mewakili 25 km." },
        {
          column: 1,
          label:
            "Pada peta berskala 1 : 500.000, jalan dari P ke Q digambar setengah panjang gambarnya pada peta itu.",
        },
        {
          column: 2,
          label:
            "Jika peta itu difotokopi dengan perbesaran 200%, skala peta hasil fotokopi menjadi 1 : 500.000.",
        },
      ],
    },
  },
};

export default item;
